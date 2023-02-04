const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Fname: {
      type: String,
      required: true,
    },
    Lname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    
  },
{ timestamps: true });

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;