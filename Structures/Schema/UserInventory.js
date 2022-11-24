const { mongoose } = require("mongoose");

const UserInv = new mongoose.Schema({
  user: "String",

  pickaxe: { name: { type: "String", default: "None" }, durability: "Number" },
  Stone: { type: "Number", default: 0 },
  Iron: { type: "Number", default: 0 },
  Diamond: { type: "Number", default: 0 },

  sword: { name: { type: "String", default: "None" }, durability: "Number" },
  String: { type: "Number", default: 0 },
  Leather: { type: "Number", default: 0 },
  Wolf_Teeth: { type: "Number", default: 0 },

  axe: { name: { type: "String", default: "None" }, durability: "Number" },
  Oak_Wood: { type: "Number", default: 0 },
  Maple_Wood: { type: "Number", default: 0 },
  Tiger_Wood: { type: "Number", default: 0 },

  fishing_rod: {
    name: { type: "String", default: "None" },
    durability: "Number",
  },

  queueSlot1: { item: "String", queueTime: "Number" },
  queueSlot2: { item: "String", queueTime: "Number" },
  queueSlot3: { item: "String", queueTime: "Number" },

  miningcooldown: "String",
  choppingcooldown: "String",
});

const UserInventory = mongoose.model("UserInv", UserInv);

module.exports = UserInventory;
