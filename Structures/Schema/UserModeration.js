const { mongoose } = require("mongoose");

const UserMod = new mongoose.Schema({
  user: "String",
  warns: "Number",
});

const UserModeration = mongoose.model("UserMod", UserMod);

module.exports = UserModeration;
