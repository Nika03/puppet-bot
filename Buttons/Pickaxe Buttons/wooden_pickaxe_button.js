const { MessageEmbed, User } = require("discord.js");
const UserInventory = require("../../Structures/Schema/UserInventory");

module.exports = {
  id: "wooden_pickaxe_button",
  permission: "SEND_MESSAGES",
  async execute(interaction, client) {
    if (interaction.message.interaction.user.id !== interaction.user.id)
      return interaction.deferUpdate();
    var findUser = await UserInventory.findOne({ user: interaction.user.id });
    if (!findUser) {
      await UserInventory.create({ user: interaction.user.id });
    }
    var findUser = await UserInventory.findOne({ user: interaction.user.id });
    if (findUser.pickaxe.name === "wooden_pickaxe") {
      return interaction.reply({
        content: "You already have a wooden pickaxe.",
        ephemeral: true,
      });
    }
    if (findUser.queueSlot1.toString() !== "{}") {
      if (findUser.queueSlot1.item === "wooden_pickaxe") {
        return interaction.reply({
          content: "You are already crafting a `wooden_pickaxe`.",
          ephemeral: true,
        });
      }
    } else if (findUser.queueSlot2.toString() !== "{}") {
      if (findUser.queueSlot2.item === "wooden_pickaxe") {
        return interaction.reply({
          content: "You are already crafting a `wooden_pickaxe`.",
          ephemeral: true,
        });
      }
    } else if (findUser.queueSlot3.toString() !== "{}") {
      if (findUser.queueSlot3.item === "wooden_pickaxe") {
        return interaction.reply({
          content: "You are already crafting a `wooden_pickaxe`.",
          ephemeral: true,
        });
      }
    }
    if (findUser.queueSlot1.toString() === "{}") {
      await UserInventory.findOneAndUpdate(
        { user: interaction.user.id },
        {
          queueSlot1: {
            item: "wooden_pickaxe",
            queueTime: `${Math.floor(Date.now() / 1000) + 30}`,
          },
        }
      );
    } else if (findUser.queueSlot2.toString() === "{}") {
      await UserInventory.findOneAndUpdate(
        { user: interaction.user.id },
        {
          queueSlot2: {
            item: "wooden_pickaxe",
            queueTime: `${Math.floor(Date.now() / 1000) + 30}`,
          },
        }
      );
    } else if (findUser.queueSlot3.toString() === "{}") {
      await UserInventory.findOneAndUpdate(
        { user: interaction.user.id },
        {
          queueSlot3: {
            item: "wooden_pickaxe",
            queueTime: `${Math.floor(Date.now() / 1000) + 30}`,
          },
        }
      );
    } else {
      return interaction.reply({
        content: "You have no queue slots available to craft `wooden_pickaxe`.",
        ephemeral: true,
      });
    }
    interaction.reply({
      content: `\`wooden_pickaxe\` is now being crafted and will end at <t:${
        Math.floor(Date.now() / 1000) + 30
      }>.`,
      ephemeral: true,
    });
  },
};
