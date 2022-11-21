const { MessageEmbed, User } = require("discord.js");
const UserInventory = require("../../Structures/Schema/UserInventory");

module.exports = {
  id: "iron_pickaxe_button",
  permission: "SEND_MESSAGES",
  async execute(interaction, client) {
    if (interaction.message.interaction.user.id !== interaction.user.id)
      return interaction.deferUpdate();
    var findUser = await UserInventory.findOne({ user: interaction.user.id });
    if (!findUser) {
      await UserInventory.create({ user: interaction.user.id });
    }
    var findUser = await UserInventory.findOne({ user: interaction.user.id });
    if (findUser.pickaxe.name === "iron_pickaxe") {
      return interaction.reply({
        content: "You already have an iron pickaxe.",
        ephemeral: true,
      });
    }
    if (findUser.queueSlot1.toString() !== "{}") {
      console.log(findUser.queueSlot1.item);
      if (findUser.queueSlot1.item === "iron_pickaxe") {
        return interaction.reply({
          content: "You are already crafting an `iron_pickaxe`.",
          ephemeral: true,
        });
      }
    } else if (findUser.queueSlot2.toString() !== "{}") {
      if (findUser.queueSlot2.item === "iron_pickaxe") {
        return interaction.reply({
          content: "You are already crafting an `iron_pickaxe`.",
          ephemeral: true,
        });
      }
    } else if (findUser.queueSlot3.toString() !== "{}") {
      if (findUser.queueSlot3.item === "iron_pickaxe") {
        return interaction.reply({
          content: "You are already crafting an `iron_pickaxe`.",
          ephemeral: true,
        });
      }
    }
    if (findUser.queueSlot1.toString() === "{}") {
      await UserInventory.findOneAndUpdate(
        { user: interaction.user.id },
        {
          queueSlot1: {
            item: "iron_pickaxe",
            queueTime: `${Math.floor(Date.now() / 1000) + 540}`,
          },
        }
      );
    } else if (findUser.queueSlot2.toString() === "{}") {
      await UserInventory.findOneAndUpdate(
        { user: interaction.user.id },
        {
          queueSlot2: {
            item: "iron_pickaxe",
            queueTime: `${Math.floor(Date.now() / 1000) + 540}`,
          },
        }
      );
    } else if (findUser.queueSlot3.toString() === "{}") {
      await UserInventory.findOneAndUpdate(
        { user: interaction.user.id },
        {
          queueSlot3: {
            item: "iron_pickaxe",
            queueTime: `${Math.floor(Date.now() / 1000) + 540}`,
          },
        }
      );
    } else {
      return interaction.reply({
        content: "You have no queue slots available to craft `iron_pickaxe`.",
        ephemeral: true,
      });
    }
    interaction.reply({
      content: `\`iron_pickaxe\` is now being crafted and will end at <t:${
        Math.floor(Date.now() / 1000) + 270
      }>.`,
      ephemeral: true,
    });
  },
};
