const { Client, Guild, MessageEmbed } = require("discord.js");
const UserInventory = require("../../Structures/Schema/UserInventory");

module.exports = {
  name: "ready",
  /**
   * @param {Client} client
   * @param {Guild} guild
   */
  async execute(client) {
    setInterval(async () => {
      const queues = await UserInventory.find();
      queues.forEach(async (i) => {
        if (
          i.queueSlot1.toString() !== "{}" &&
          i.queueSlot1.queueTime < Math.floor(Date.now() / 1000)
        ) {
          if (i.queueSlot1.item.toString().includes("pickaxe")) {
            const pickaxe = i.queueSlot1.item.toString();
            if (pickaxe === "wooden_pickaxe") newItemDurability = 50;
            if (pickaxe === "stone_pickaxe") newItemDurability = 125;
            if (pickaxe === "iron_pickaxe") newItemDurability = 325;
            await UserInventory.findOneAndUpdate(
              { user: i.user },
              {
                pickaxe: { name: pickaxe, durability: newItemDurability },
                queueSlot1: {},
              }
            );
          } else if (i.queueSlot1.toString().includes("sword")) {
            const sword = i.queueSlot1.item.toString();
            if (sword === "wooden_sword") newItemDurability = 35;
            if (sword === "stone_sword") newItemDurability = 160;
            if (sword === "iron_sword") newItemDurability = 350;
            await UserInventory.findOneAndUpdate(
              { user: i.user },
              {
                sword: { name: sword, durability: newItemDurability },
                queueSlot1: {},
              }
            );
          }
        } else if (
          i.queueSlot2.toString() !== "{}" &&
          i.queueSlot2.queueTime < Math.floor(Date.now() / 1000)
        ) {
          if (i.queueSlot2.item.toString().includes("pickaxe")) {
            const pickaxe = i.queueSlot2.item.toString();
            if (pickaxe === "wooden_pickaxe") newItemDurability = 50;
            if (pickaxe === "stone_pickaxe") newItemDurability = 125;
            if (pickaxe === "iron_pickaxe") newItemDurability = 325;
            await UserInventory.findOneAndUpdate(
              { user: i.user },
              {
                pickaxe: { name: pickaxe, durability: newItemDurability },
                queueSlot2: {},
              }
            );
          } else if (i.queueSlot2.toString().includes("sword")) {
            const sword = i.queueSlot2.item.toString();
            if (sword === "wooden_sword") newItemDurability = 35;
            if (sword === "stone_sword") newItemDurability = 160;
            if (sword === "iron_sword") newItemDurability = 350;
            await UserInventory.findOneAndUpdate(
              { user: i.user },
              {
                sword: { name: sword, durability: newItemDurability },
                queueSlot2: {},
              }
            );
          }
        } else if (
          i.queueSlot3.toString() !== "{}" &&
          i.queueSlot3.queueTime < Math.floor(Date.now() / 1000)
        ) {
          if (i.queueSlot3.item.toString().includes("pickaxe")) {
            const pickaxe = i.queueSlot3.item.toString();
            if (pickaxe === "wooden_pickaxe") newItemDurability = 50;
            if (pickaxe === "stone_pickaxe") newItemDurability = 125;
            if (pickaxe === "iron_pickaxe") newItemDurability = 325;
            await UserInventory.findOneAndUpdate(
              { user: i.user },
              {
                pickaxe: { name: pickaxe, durability: newItemDurability },
                queueSlot3: {},
              }
            );
          } else if (i.queueSlot3.toString().includes("sword")) {
            const sword = i.queueSlot3.item.toString();
            if (sword === "wooden_sword") newItemDurability = 35;
            if (sword === "stone_sword") newItemDurability = 160;
            if (sword === "iron_sword") newItemDurability = 350;
            await UserInventory.findOneAndUpdate(
              { user: i.user },
              {
                sword: { name: sword, durability: newItemDurability },
                queueSlot3: {},
              }
            );
          }
        }
      });
    }, 1000);
  },
};
