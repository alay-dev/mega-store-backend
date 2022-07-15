const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  contact_no: {
    type: Number,
  },
  email: {
    type: String,
    required: [true, "Email is missing"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is missing"],
  },
  homeAddress: {
    type: String,
    default: "",
  },
  workAddress: {
    type: String,
    default: "",
  },
  otherAddress: {
    type: String,
    default: "",
  },
  profileImg: {
    type: String,
  },
  type: {
    type: String,
    default: "U",
  },
});

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
