const express = require("express");

const userRouter = require("./routers/userRoutes");
const taskRouter = require("./routers/taskRoutes");

require("./db/mongoose");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
