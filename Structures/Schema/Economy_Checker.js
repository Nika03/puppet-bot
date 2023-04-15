const { mongoose } = require("mongoose");

const Economy_Checker = new mongoose.Schema({
  user: `String`,
  balance: { type: "Number", default: 0 },
  tbalance: { type: "Number", default: 0 },
  inventory: `Array`,
  ask_cooldown: `Number`,
  daily_cooldown: `Number`,
  daily_streak: { type: "Number", default: 0 },
  daily_last_claimed: `Number`,
  button_clicked: { type: "Number", default: 0 },
  claimed_level_5: `Boolean`,
  claimed_level_10: `Boolean`,
  claimed_level_20: `Boolean`,
  claimed_level_30: `Boolean`,
  claimed_level_40: `Boolean`,
  claimed_level_50: `Boolean`,
  claimed_level_75: `Boolean`,
  claimed_level_100: `Boolean`,
  search_cooldown: `Number`,
});

const EconomyChecker = mongoose.model("Economy_Checker", Economy_Checker);

module.exports = EconomyChecker;
