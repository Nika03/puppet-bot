const { mongoose } = require("mongoose");

const Blacklist = new mongoose.Schema({
  user: "String",
});

const BlacklistModel = mongoose.model("Blacklist", Blacklist);

module.exports = BlacklistModel;
