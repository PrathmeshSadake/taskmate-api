const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const Task = require("./task");

const UserSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true, // prevent same email account creation
      trim: true, //removes whitespace from start and end is there.
      lowercase: true, //converts to lowercase
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Please enter a valid email address");
        }
      },
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minLength: 7,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password must not contain 'password'");
        }
      },
    },
    age: {
      type: Number,
      validate(value) {
        if (value < 0) {
          throw new Error("Age must be positive number");
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

// Generating token
UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.JSON_SECRET,
    {
      expiresIn: "7 days",
    }
  );
  user.tokens = user.tokens.concat({ token: token });
  await user.save();
  return token;
};

// send only user essentails data in login route.
UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;
  return userObject;
};

UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    throw new Error("Unable to login");
  }

  return user;
};

// Delete user task when user is deleted
UserSchema.pre("remove", async function (next) {
  const user = this;
  await Task.deleteMany({ owner: user._id });
  next();
});

// Middleware to Hash the plain text password
UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next(); //important to call next. To let express know that we have completed above task and move on.
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
