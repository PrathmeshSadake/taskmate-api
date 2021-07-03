const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});
const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
