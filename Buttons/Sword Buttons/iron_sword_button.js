const { MessageEmbed, User } = require("discord.js");
const UserInventory = require("../../Structures/Schema/UserInventory");
const EconomyChecker = require("../../Structures/Schema/Economy_Checker");

module.exports = {
  id: "iron_sword_button",
  permission: "SEND_MESSAGES",
  async execute(interaction, client) {
    if (interaction.message.interaction.user.id !== interaction.user.id)
      return interaction.deferUpdate();
    var findUser = await UserInventory.findOne({ user: interaction.user.id });
    if (!findUser) {
      await UserInventory.create({ user: interaction.user.id });
    }
    var findUser = await UserInventory.findOne({ user: interaction.user.id });
    if (findUser.pickaxe.name === "iron_sword") {
      return interaction.reply({
        content: "You already have a iron sword.",
        ephemeral: true,
      });
    }
    if (findUser.queueSlot1.toString() !== "{}") {
      if (findUser.queueSlot1.item === "iron_sword") {
        return interaction.reply({
          content: "You are already crafting a `iron_sword`.",
          ephemeral: true,
        });
      }
    } else if (findUser.queueSlot2.toString() !== "{}") {
      if (findUser.queueSlot2.item === "iron_sword") {
        return interaction.reply({
          content: "You are already crafting a `iron_sword`.",
          ephemeral: true,
        });
      }
    } else if (findUser.queueSlot3.toString() !== "{}") {
      if (findUser.queueSlot3.item === "iron_sword") {
        return interaction.reply({
          content: "You are already crafting a `iron_sword`.",
          ephemeral: true,
        });
      }
    }
    var balance = await EconomyChecker.findOne({ user: interaction.user.id });
    var inventory = await UserInventory.findOne({ user: interaction.user.id });
    if (
      inventory.Stone >= 16 &&
      inventory.Maple_Wood >= 7 &&
      balance.balance >= 1750
    ) {
      if (findUser.queueSlot1.toString() === "{}") {
        await UserInventory.findOneAndUpdate(
          { user: interaction.user.id },
          {
            queueSlot1: {
              item: "iron_sword",
              queueTime: `${Math.floor(Date.now() / 1000) + 60}`,
            },
          }
        );
      } else if (findUser.queueSlot2.toString() === "{}") {
        await UserInventory.findOneAndUpdate(
          { user: interaction.user.id },
          {
            queueSlot2: {
              item: "iron_sword",
              queueTime: `${Math.floor(Date.now() / 1000) + 60}`,
            },
          }
        );
      } else if (findUser.queueSlot3.toString() === "{}") {
        await UserInventory.findOneAndUpdate(
          { user: interaction.user.id },
          {
            queueSlot3: {
              item: "iron_sword",
              queueTime: `${Math.floor(Date.now() / 1000) + 60}`,
            },
          }
        );
      } else {
        return interaction.reply({
          content: "You have no queue slots available to craft `iron_sword`.",
          ephemeral: true,
        });
      }
      const newIron = inventory.Iron - 9;
      const newLeather = inventory.Leather - 11;
      const newWood = inventory.Maple_Wood - 3;
      const newBalance = balance.balance - 1750;
      await UserInventory.findOneAndUpdate(
        { user: interaction.user.id },
        { Maple_Wood: newWood, Iron: newIron, Leather: newLeather }
      );
      await EconomyChecker.findOneAndUpdate(
        { user: interaction.user.id },
        { balance: newBalance }
      );
    } else {
      return interaction.reply({
        content: "You dont have sufficient materials to craft this item.",
        ephemeral: true,
      });
    }

    interaction.reply({
      content: `\`iron_sword\` is now being crafted and will end at <t:${
        Math.floor(Date.now() / 1000) + 60
      }>.`,
      ephemeral: true,
    });
  },
};
