const { MessageEmbed, User } = require("discord.js");
const UserInventory = require("../../Structures/Schema/UserInventory");
const EconomyChecker = require("../../Structures/Schema/Economy_Checker");

module.exports = {
  id: "iron_axe_button",
  permission: "SEND_MESSAGES",
  async execute(interaction, client) {
    if (interaction.message.interaction.user.id !== interaction.user.id)
      return interaction.deferUpdate();
    var findUser = await UserInventory.findOne({ user: interaction.user.id });
    if (!findUser) {
      await UserInventory.create({ user: interaction.user.id });
    }
    var findUser = await UserInventory.findOne({ user: interaction.user.id });
    if (findUser.axe.name === "iron_axe") {
      return interaction.reply({
        content: "You already have an iron axe.",
        ephemeral: true,
      });
    }
    if (findUser.queueSlot1.toString() !== "{}") {
      console.log(findUser.queueSlot1.item);
      if (findUser.queueSlot1.item === "iron_axe") {
        return interaction.reply({
          content: "You are already crafting an `iron_axe`.",
          ephemeral: true,
        });
      }
    } else if (findUser.queueSlot2.toString() !== "{}") {
      if (findUser.queueSlot2.item === "iron_axe") {
        return interaction.reply({
          content: "You are already crafting an `iron_axe`.",
          ephemeral: true,
        });
      }
    } else if (findUser.queueSlot3.toString() !== "{}") {
      if (findUser.queueSlot3.item === "iron_axe") {
        return interaction.reply({
          content: "You are already crafting an `iron_axe`.",
          ephemeral: true,
        });
      }
    }
    var balance = await EconomyChecker.findOne({ user: interaction.user.id });
    var inventory = await UserInventory.findOne({ user: interaction.user.id });
    if (
      inventory.Oak_Wood >= 27 &&
      inventory.Iron >= 16 &&
      inventory.Leather >= 2 &&
      balance.balance >= 1200
    ) {
      if (findUser.queueSlot1.toString() === "{}") {
        await UserInventory.findOneAndUpdate(
          { user: interaction.user.id },
          {
            queueSlot1: {
              item: "iron_axe",
              queueTime: `${Math.floor(Date.now() / 1000) + 540}`,
            },
          }
        );
      } else if (findUser.queueSlot2.toString() === "{}") {
        await UserInventory.findOneAndUpdate(
          { user: interaction.user.id },
          {
            queueSlot2: {
              item: "iron_axe",
              queueTime: `${Math.floor(Date.now() / 1000) + 540}`,
            },
          }
        );
      } else if (findUser.queueSlot3.toString() === "{}") {
        await UserInventory.findOneAndUpdate(
          { user: interaction.user.id },
          {
            queueSlot3: {
              item: "iron_axe",
              queueTime: `${Math.floor(Date.now() / 1000) + 540}`,
            },
          }
        );
      } else {
        return interaction.reply({
          content: "You have no queue slots available to craft `iron_axe`.",
          ephemeral: true,
        });
      }
      const newIron = inventory.Iron - 16;
      const newWood = inventory.Oak_Wood - 27;
      const newLeather = inventory.Leather - 2;
      const newBalance = balance.balance - 1200;
      await UserInventory.findOneAndUpdate(
        { user: interaction.user.id },
        { Iron: newIron, Oak_Wood: newWood, Leather: newLeather }
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
      content: `\`iron_axe\` is now being crafted and will end at <t:${
        Math.floor(Date.now() / 1000) + 540
      }>.`,
      ephemeral: true,
    });
  },
};
