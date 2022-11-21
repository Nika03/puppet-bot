const { CommandInteraction, MessageEmbed, User } = require("discord.js");
const UserInventory = require("../../Structures/Schema/UserInventory");

module.exports = {
  name: "inventory",
  description: "Check your inventory.",
  permission: "SEND_MESSAGES",
  type: "Economy",
  usage: "`Under Development`",
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (interaction.user.id !== "452436342841016341") {
      return interaction.reply({
        content: "This command is under development.",
        ephemeral: true,
      });
    }
    var findUser = await UserInventory.findOne({ user: interaction.user.id });
    if (!findUser) {
      await UserInventory.create({ user: interaction.user.id });
    }
    var inventory = await UserInventory.findOne({ user: interaction.user.id });

    if (inventory.Wood) {
      userWood = `Total Wood: \`${inventory.Wood}\`\n`;
    } else {
      userWood = "";
    }
    if (inventory.Stone) {
      userStone = `Total Stone: \`${inventory.Stone}\`\n`;
    } else {
      userStone = "";
    }
    if (inventory.Iron) {
      userIron = `Total Iron: \`${inventory.Iron}\``;
    } else {
      userIron = "";
    }

    if (inventory.pickaxe) {
      userInventoryPickaxe = inventory.pickaxe;
    } else {
      userInventoryPickaxe = "{}";
    }
    if (userInventoryPickaxe.toString() === "{}") {
      userInventoryPickaxe = "";
    } else {
      userInventoryPickaxe = `
Pickaxe: \`${inventory.pickaxe.name}\`
> Durability: **${inventory.pickaxe.durability}**`;
    }
    if (
      userWood === "" &&
      userStone === "" &&
      userIron === "" &&
      userInventoryPickaxe === ""
    ) {
      return interaction.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({
              name: `${interaction.user.tag}'s Inventory`,
            })
            .setDescription("You have no items in your inventory.")
            .setColor("BLURPLE")
            .setFooter({ text: `Requested by ${interaction.user.tag}` })
            .setTimestamp(),
        ],
      });
    }
    interaction.reply({
      embeds: [
        new MessageEmbed()
          .setAuthor({
            name: `${interaction.user.tag}'s Inventory`,
          })
          .setDescription(
            `${userWood}${userStone}${userIron} ${userInventoryPickaxe}`
          )
          .setColor("BLURPLE")
          .setFooter({ text: `Requested by ${interaction.user.tag}` })
          .setTimestamp(),
      ],
    });
  },
};
