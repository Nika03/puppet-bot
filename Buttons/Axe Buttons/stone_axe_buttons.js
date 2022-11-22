const { MessageEmbed, User } = require("discord.js");
const UserInventory = require("../../Structures/Schema/UserInventory");
const EconomyChecker = require("../../Structures/Schema/Economy_Checker");

module.exports = {
  id: "stone_axe_button",
  permission: "SEND_MESSAGES",
  async execute(interaction, client) {
    if (interaction.message.interaction.user.id !== interaction.user.id)
      return interaction.deferUpdate();
    var findUser = await UserInventory.findOne({ user: interaction.user.id });
    if (!findUser) {
      await UserInventory.create({ user: interaction.user.id });
    }
    var findUser = await UserInventory.findOne({ user: interaction.user.id });
    if (findUser.axe.name === "stone_axe") {
      return interaction.reply({
        content: "You already have a stone axe.",
        ephemeral: true,
      });
    }
    if (findUser.queueSlot1.toString() !== "{}") {
      if (findUser.queueSlot1.item === "stone_axe") {
        return interaction.reply({
          content: "You are already crafting a `stone_axe`.",
          ephemeral: true,
        });
      }
    } else if (findUser.queueSlot2.toString() !== "{}") {
      if (findUser.queueSlot2.item === "stone_axe") {
        return interaction.reply({
          content: "You are already crafting a `stone_axe`.",
          ephemeral: true,
        });
      }
    } else if (findUser.queueSlot3.toString() !== "{}") {
      if (findUser.queueSlot3.item === "stone_axe") {
        return interaction.reply({
          content: "You are already crafting a `stone_axe`.",
          ephemeral: true,
        });
      }
    }
    var balance = await EconomyChecker.findOne({ user: interaction.user.id });
    if (!balance) {
      await EconomyChecker.create({ user: interaction.user.id, balance: 0 });
    }
    var balance = await EconomyChecker.findOne({ user: interaction.user.id });
    var inventory = await UserInventory.findOne({ user: interaction.user.id });
    if (
      inventory.Oak_Wood >= 14 &&
      inventory.Stone >= 9 &&
      balance.balance >= 450
    ) {
      if (findUser.queueSlot1.toString() === "{}") {
        await UserInventory.findOneAndUpdate(
          { user: interaction.user.id },
          {
            queueSlot1: {
              item: "stone_axe",
              queueTime: `${Math.floor(Date.now() / 1000) + 150}`,
            },
          }
        );
      } else if (findUser.queueSlot2.toString() === "{}") {
        await UserInventory.findOneAndUpdate(
          { user: interaction.user.id },
          {
            queueSlot2: {
              item: "stone_axe",
              queueTime: `${Math.floor(Date.now() / 1000) + 150}`,
            },
          }
        );
      } else if (findUser.queueSlot3.toString() === "{}") {
        await UserInventory.findOneAndUpdate(
          { user: interaction.user.id },
          {
            queueSlot3: {
              item: "stone_axe",
              queueTime: `${Math.floor(Date.now() / 1000) + 150}`,
            },
          }
        );
      } else {
        return interaction.reply({
          content: "You have no queue slots available to craft `stone_axe`.",
          ephemeral: true,
        });
      }
      const newStone = inventory.Oak_Wood - 14;
      const newWood = inventory.Wood - 9;
      const newBalance = balance.balance - 450;
      await UserInventory.findOneAndUpdate(
        { user: interaction.user.id },
        { Oak_Wood: newStone, Wood: newWood }
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
      content: `\`stone_axe\` is now being crafted and will end at <t:${
        Math.floor(Date.now() / 1000) + 150
      }>.`,
      ephemeral: true,
    });
  },
};
