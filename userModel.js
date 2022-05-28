const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  password: {
    type: String,
    minLength: [8, "Password must contain at least 8 characters"],
    maxLength: [16, "Password must contain only 16 characters"],
  },
  role:{
      type:String,
      enum:['user','admin'],
      default:'user'
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (v) {
        // this => current document
        if (this.password !== v) {
          return false;
        }
      },
      message: "Passwords does not match",
    },
  }
});

userSchema.pre("save", async function (next) {
  this.password = await bcryptjs.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

const Users = mongoose.model("Users", userSchema, "AssignmentVD");

module.exports = Users;
