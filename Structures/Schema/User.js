const { mongoose } = require("mongoose");

const User = new mongoose.Schema({
  user: "String",
  button_presses: "Number",
});

const UserInfo = mongoose.model("User", User);

module.exports = UserInfo;
