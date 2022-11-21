const { mongoose } = require("mongoose");

const UserInv = new mongoose.Schema({
  user: "String",
  Wood: "Number",
  Stone: "Number",
  Iron: "Number",
  pickaxe: { name: "String", durability: "Number" },
});

const UserInventory = mongoose.model("UserInv", UserInv);

module.exports = UserInventory;
