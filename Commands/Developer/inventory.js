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
    if (inventory.Diamond) {
      userDiamond = `Total Diamond: \`${inventory.Diamond}\``;
    } else {
      userDiamond = "";
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

    if (inventory.String) {
      userString = `Total String: \`${inventory.String}\`\n`;
    } else {
      userString = "";
    }
    if (inventory.Leather) {
      userLeather = `Total String: \`${inventory.Leather}\`\n`;
    } else {
      userLeather = "";
    }
    if (inventory.Wolf_Teeth) {
      userWolf_Teeth = `Total Wolf Teeth: \`${inventory.Wolf_Teeth}\``;
    } else {
      userWolf_Teeth = "";
    }

    if (inventory.sword) {
      userInventorySword = inventory.sword;
    } else {
      userInventorySword = "{}";
    }
    if (userInventorySword.toString() === "{}") {
      userInventorySword = "";
    } else {
      userInventorySword = `
Sword: \`${inventory.sword.name}\`
> Durability: **${inventory.sword.durability}**`;
    }
    if (inventory.axe) {
      userInventoryAxe = inventory.axe;
    } else {
      userInventoryAxe = "{}";
    }
    if (userInventoryAxe.toString() === "{}") {
      userInventoryAxe = "";
    } else {
      userInventoryAxe = `
Axe: \`${inventory.axe.name}\`
> Durability: **${inventory.axe.durability}**`;
    }
    if (inventory.Oak_Wood) {
      userOak_Wood = `Total Oak Wood: \`${inventory.Oak_Wood}\`\n`;
    } else {
      userOak_Wood = "";
    }
    if (inventory.Maple_Wood) {
      userMaple_Wood = `Total Maple Wood: \`${inventory.Maple_Wood}\`\n`;
    } else {
      userMaple_Wood = "";
    }
    if (inventory.Tiger_Wood) {
      userTiger_Wood = `Total Tiger Wood: \`${inventory.Tiger_Wood}\``;
    } else {
      userTiger_Wood = "";
    }
    if (
      userStone === "" &&
      userIron === "" &&
      userDiamond === "" &&
      userInventoryPickaxe === "" &&
      userString === "" &&
      userLeater === "" &&
      userWolf_Teeth === "" &&
      userInventorySword === "" &&
      userOak_Wood === "" &&
      userMaple_Wood === "" &&
      userTiger_Wood === "" &&
      userInventoryAxe === ""
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
            `${userStone}${userIron}${userDiamond}${userInventoryPickaxe}
${userString}${userLeather}${userWolf_Teeth}${userInventorySword}
${userOak_Wood}${userMaple_Wood}${userTiger_Wood}${userInventoryAxe}`
          )
          .setColor("BLURPLE")
          .setFooter({ text: `Requested by ${interaction.user.tag}` })
          .setTimestamp(),
      ],
    });
  },
};
