const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
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
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
