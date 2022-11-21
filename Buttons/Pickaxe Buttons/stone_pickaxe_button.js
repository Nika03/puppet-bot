const { MessageEmbed, User } = require("discord.js");
const UserInventory = require("../../Structures/Schema/UserInventory");
const EconomyChecker = require("../../Structures/Schema/Economy_Checker");

module.exports = {
  id: "stone_pickaxe_button",
  permission: "SEND_MESSAGES",
  async execute(interaction, client) {
    if (interaction.message.interaction.user.id !== interaction.user.id)
      return interaction.deferUpdate();
    var findUser = await UserInventory.findOne({ user: interaction.user.id });
    if (!findUser) {
      await UserInventory.create({ user: interaction.user.id });
    }
    var findUser = await UserInventory.findOne({ user: interaction.user.id });
    if (findUser.pickaxe.name === "stone_pickaxe") {
      return interaction.reply({
        content: "You already have a stone pickaxe.",
        ephemeral: true,
      });
    }
    if (findUser.queueSlot1.toString() !== "{}") {
      if (findUser.queueSlot1.item === "stone_pickaxe") {
        return interaction.reply({
          content: "You are already crafting a `stone_pickaxe`.",
          ephemeral: true,
        });
      }
    } else if (findUser.queueSlot2.toString() !== "{}") {
      if (findUser.queueSlot2.item === "stone_pickaxe") {
        return interaction.reply({
          content: "You are already crafting a `stone_pickaxe`.",
          ephemeral: true,
        });
      }
    } else if (findUser.queueSlot3.toString() !== "{}") {
      if (findUser.queueSlot3.item === "stone_pickaxe") {
        return interaction.reply({
          content: "You are already crafting a `stone_pickaxe`.",
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
      inventort.Wood >= 7 &&
      inventory.Stone >= 25 &&
      balance.balance >= 450
    ) {
      const newStone = inventory.Stone - 25;
      const newBalance = balance.balance - 450;
      await UserInventory.findOneAndUpdate(
        { user: interaction.user.id },
        { Stone: newStone }
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

    if (findUser.queueSlot1.toString() === "{}") {
      await UserInventory.findOneAndUpdate(
        { user: interaction.user.id },
        {
          queueSlot1: {
            item: "stone_pickaxe",
            queueTime: `${Math.floor(Date.now() / 1000) + 270}`,
          },
        }
      );
    } else if (findUser.queueSlot2.toString() === "{}") {
      await UserInventory.findOneAndUpdate(
        { user: interaction.user.id },
        {
          queueSlot2: {
            item: "stone_pickaxe",
            queueTime: `${Math.floor(Date.now() / 1000) + 270}`,
          },
        }
      );
    } else if (findUser.queueSlot3.toString() === "{}") {
      await UserInventory.findOneAndUpdate(
        { user: interaction.user.id },
        {
          queueSlot3: {
            item: "stone_pickaxe",
            queueTime: `${Math.floor(Date.now() / 1000) + 270}`,
          },
        }
      );
    } else {
      return interaction.reply({
        content: "You have no queue slots available to craft `stone_pickaxe`.",
        ephemeral: true,
      });
    }
    interaction.reply({
      content: `\`stone_pickaxe\` is now being crafted and will end at <t:${
        Math.floor(Date.now() / 1000) + 270
      }>.`,
      ephemeral: true,
    });
  },
};
