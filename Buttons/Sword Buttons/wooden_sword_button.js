const { MessageEmbed, User } = require("discord.js");
const UserInventory = require("../../Structures/Schema/UserInventory");
const EconomyChecker = require("../../Structures/Schema/Economy_Checker");

module.exports = {
  id: "wooden_sword_button",
  permission: "SEND_MESSAGES",
  async execute(interaction, client) {
    if (interaction.message.interaction.user.id !== interaction.user.id)
      return interaction.deferUpdate();
    var findUser = await UserInventory.findOne({ user: interaction.user.id });
    if (!findUser) {
      await UserInventory.create({ user: interaction.user.id });
    }
    var findUser = await UserInventory.findOne({ user: interaction.user.id });
    if (findUser.sword.name === "wooden_sword") {
      return interaction.reply({
        content: "You already have a wooden sword.",
        ephemeral: true,
      });
    }
    if (findUser.queueSlot1.toString() !== "{}") {
      if (findUser.queueSlot1.item === "wooden_sword") {
        return interaction.reply({
          content: "You are already crafting a `wooden_sword`.",
          ephemeral: true,
        });
      }
    } else if (findUser.queueSlot2.toString() !== "{}") {
      if (findUser.queueSlot2.item === "wooden_sword") {
        return interaction.reply({
          content: "You are already crafting a `wooden_sword`.",
          ephemeral: true,
        });
      }
    } else if (findUser.queueSlot3.toString() !== "{}") {
      if (findUser.queueSlot3.item === "wooden_sword") {
        return interaction.reply({
          content: "You are already crafting a `wooden_sword`.",
          ephemeral: true,
        });
      }
    }
    var balance = await EconomyChecker.findOne({ user: interaction.user.id });
    var inventory = await UserInventory.findOne({ user: interaction.user.id });
    if (inventory.Oak_Wood >= 4 && balance.balance >= 125) {
      if (findUser.queueSlot1.toString() === "{}") {
        await UserInventory.findOneAndUpdate(
          { user: interaction.user.id },
          {
            queueSlot1: {
              item: "wooden_sword",
              queueTime: `${Math.floor(Date.now() / 1000) + 60}`,
            },
          }
        );
      } else if (findUser.queueSlot2.toString() === "{}") {
        await UserInventory.findOneAndUpdate(
          { user: interaction.user.id },
          {
            queueSlot2: {
              item: "wooden_sword",
              queueTime: `${Math.floor(Date.now() / 1000) + 60}`,
            },
          }
        );
      } else if (findUser.queueSlot3.toString() === "{}") {
        await UserInventory.findOneAndUpdate(
          { user: interaction.user.id },
          {
            queueSlot3: {
              item: "wooden_sword",
              queueTime: `${Math.floor(Date.now() / 1000) + 60}`,
            },
          }
        );
      } else {
        return interaction.reply({
          content: "You have no queue slots available to craft `wooden_sword`.",
          ephemeral: true,
        });
      }
      const newWood = inventory.Oak_Wood - 4;
      const newBalance = balance.balance - 125;
      await UserInventory.findOneAndUpdate(
        { user: interaction.user.id },
        { Oak_Wood: newWood }
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
      content: `\`wooden_sword\` is now being crafted and will end at <t:${
        Math.floor(Date.now() / 1000) + 60
      }>.`,
      ephemeral: true,
    });
  },
};
