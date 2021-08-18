const express = require("express");
const router = express.Router();

const Task = require("../models/task");
const auth = require("../middleware/auth");

router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET tasks/sortBy=createdAt:desc or :asc
router.get("/tasks", auth, async (req, res) => {
  const match = {};
  const sort = {};

  // req.query.completed will be in string format.
  if (req.query.completed) {
    match.completed = req.query.completed === "true" ? true : false;
  }
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    // const tasks = await Task.find({ owner: req.user._id, completed:true });
    // res.send(tasks);
    //same as above
    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send("Task not found");
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.patch("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  const updateKeys = Object.keys(req.body);
  const updatesAllowed = ["description", "completed"];

  const areUpdatesValid = updateKeys.every((update) =>
    updatesAllowed.includes(update)
  );

  if (!areUpdatesValid) {
    return res.status(400).send({ error: "Invalid update" });
  }
  try {
    const task = await Task.findOne({
      _id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(400).send();
    }
    updateKeys.forEach((update) => {
      task[update] = req.body[update];
    });
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.delete("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOneAndDelete({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
