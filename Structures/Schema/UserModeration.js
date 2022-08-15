const { mongoose } = require("mongoose");

const UserModeration = new mongoose.Schema({
  user: "String",
  warns: "Number",
});

const UMM = mongoose.model("UserModeration", UserModeration);

module.exports = UMM;
