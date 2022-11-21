const { mongoose } = require("mongoose");

const UserInv = new mongoose.Schema({
  user: "String",
  pickaxe: { name: "String", durability: "Number" },
  Wood: "Number",
  Stone: "Number",
  Iron: "Number",
  sword: { name: "String", durability: "Number" },
  String: "Number",
  Leather: "Number",
  Wolf_Teeth: "Number",
  fishing_rod: { name: "String", durability: "Number" },
  queueSlot1: { item: "String", queueTime: "Number" },
  queueSlot2: { item: "String", queueTime: "Number" },
  queueSlot3: { item: "String", queueTime: "Number" },
});

const UserInventory = mongoose.model("UserInv", UserInv);

module.exports = UserInventory;
