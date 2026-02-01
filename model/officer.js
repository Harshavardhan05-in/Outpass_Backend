const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const OfficerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

/* 🔐 Password Hashing */
OfficerSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

/* 🔑 JWT Generation (NO DB SAVE) */
OfficerSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      id: this._id,
      username:this.username,
      isAdmin: this.isAdmin
    },
    "thisisrguktbasaronlinemanagementsystem",
    { expiresIn: "1d" }
  );
};

const Officer = mongoose.model("Officer", OfficerSchema);

module.exports = Officer;
