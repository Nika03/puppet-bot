const { mongoose } = require("mongoose");

const Settings = new mongoose.Schema({
  commands: `String`,
  channel: `String`,
  Count: { type: "Number", default: 1 },
  Last: { type: "Number", default: 1 },
});

const SettingsModel = mongoose.model("Settings", Settings);

module.exports = SettingsModel;
