const express = require("express");
require("./db/mongoose");

const userRouter = require("./routers/userRoutes");
const taskRouter = require("./routers/taskRoutes");

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.send("GET requests are disable");
//   } else {
//     next();
//   }
// });
// app.use((req, res, next) => {
//   res.status(503).send("we're currently under maintainance");
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
