const express = require("express");
require("./db/mongoose");

const userRouter = require("./routers/userRoutes");
const taskRouter = require("./routers/taskRoutes");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});

var jwt = require("jsonwebtoken");
const myFunction = () => {
  const token = jwt.sign({ _id: "apwk1lk13nlkn4j1nlj1" }, "thisismynewtoken", {
    expiresIn: "7 days",
  });
  // console.log(token);
  console.log(jwt.verify(token, "thisismynewtoken"));
};

myFunction();
