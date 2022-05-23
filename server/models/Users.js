const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    reguired: true,
  },
  img: {
    type: String,
  },
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
