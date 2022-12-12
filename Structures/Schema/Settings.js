const { mongoose } = require("mongoose");

const Settings = new mongoose.Schema({
  commands: `String`,
  channel: `String`,
});

const SettingsModel = mongoose.model("Settings", Settings);

module.exports = SettingsModel;
