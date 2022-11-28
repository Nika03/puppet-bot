const { MessageEmbed, User } = require("discord.js");
const UserInventory = require("../../Structures/Schema/UserInventory");
const EconomyChecker = require("../../Structures/Schema/Economy_Checker");

module.exports = {
  id: "stone_sword_button",
  permission: "SEND_MESSAGES",
  async execute(interaction, client) {
    if (interaction.message.interaction.user.id !== interaction.user.id)
      return interaction.deferUpdate();
    var findUser = await UserInventory.findOne({ user: interaction.user.id });
    if (!findUser) {
      await UserInventory.create({ user: interaction.user.id });
    }
    var findUser = await UserInventory.findOne({ user: interaction.user.id });
    if (findUser.sword.name === "stone_sword") {
      return interaction.reply({
        content: "You already have a stone sword.",
        ephemeral: true,
      });
    }
    if (findUser.queueSlot1.toString() !== "{}") {
      if (findUser.queueSlot1.item === "stone_sword") {
        return interaction.reply({
          content: "You are already crafting a `stone_sword`.",
          ephemeral: true,
        });
      }
    } else if (findUser.queueSlot2.toString() !== "{}") {
      if (findUser.queueSlot2.item === "stone_sword") {
        return interaction.reply({
          content: "You are already crafting a `stone_sword`.",
          ephemeral: true,
        });
      }
    } else if (findUser.queueSlot3.toString() !== "{}") {
      if (findUser.queueSlot3.item === "stone_sword") {
        return interaction.reply({
          content: "You are already crafting a `stone_sword`.",
          ephemeral: true,
        });
      }
    }
    var balance = await EconomyChecker.findOne({ user: interaction.user.id });
    var inventory = await UserInventory.findOne({ user: interaction.user.id });
    if (
      inventory.Stone >= 45 &&
      inventory.Maple_Wood >= 50 &&
      balance.balance >= 750
    ) {
      if (findUser.queueSlot1.toString() === "{}") {
        await UserInventory.findOneAndUpdate(
          { user: interaction.user.id },
          {
            queueSlot1: {
              item: "stone_sword",
              queueTime: `${Math.floor(Date.now() / 1000) + 320}`,
            },
          }
        );
      } else if (findUser.queueSlot2.toString() === "{}") {
        await UserInventory.findOneAndUpdate(
          { user: interaction.user.id },
          {
            queueSlot2: {
              item: "stone_sword",
              queueTime: `${Math.floor(Date.now() / 1000) + 320}`,
            },
          }
        );
      } else if (findUser.queueSlot3.toString() === "{}") {
        await UserInventory.findOneAndUpdate(
          { user: interaction.user.id },
          {
            queueSlot3: {
              item: "stone_sword",
              queueTime: `${Math.floor(Date.now() / 1000) + 320}`,
            },
          }
        );
      } else {
        return interaction.reply({
          content: "You have no queue slots available to craft `stone_sword`.",
          ephemeral: true,
        });
      }
      const newStone = inventory.Stone - 45;
      const newWood = inventory.Maple_Wood - 50;
      const newBalance = balance.balance - 750;
      await UserInventory.findOneAndUpdate(
        { user: interaction.user.id },
        { Maple_Wood: newWood, Stone: newStone }
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
      content: `\`stone_sword\` is now being crafted and will end at <t:${
        Math.floor(Date.now() / 1000) + 320
      }>.`,
      ephemeral: true,
    });
  },
};
