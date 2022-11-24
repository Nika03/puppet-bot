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
      userStone = `> Stone: \`${inventory.Stone}\``;
    } else {
      userStone = "";
    }
    if (inventory.Iron) {
      userIron = `> Iron: \`${inventory.Iron}\``;
    } else {
      userIron = "";
    }
    if (inventory.Diamond) {
      userDiamond = `> Diamond: \`${inventory.Diamond}\``;
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
      userInventoryPickaxe = `Pickaxe: \`${inventory.pickaxe.name}\`\n> Durability: **${inventory.pickaxe.durability}**`;
    }

    if (inventory.String) {
      userString = `> String: \`${inventory.String}\``;
    } else {
      userString = "";
    }
    if (inventory.Leather) {
      userLeather = `> String: \`${inventory.Leather}\``;
    } else {
      userLeather = "";
    }
    if (inventory.Wolf_Teeth) {
      userWolf_Teeth = `> Wolf Teeth: \`${inventory.Wolf_Teeth}\``;
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
      userOak_Wood = `> Oak Wood: \`${inventory.Oak_Wood}\``;
    } else {
      userOak_Wood = "";
    }
    if (inventory.Maple_Wood) {
      userMaple_Wood = `> Maple Wood: \`${inventory.Maple_Wood}\``;
    } else {
      userMaple_Wood = "";
    }
    if (inventory.Tiger_Wood) {
      userTiger_Wood = `> Tiger Wood: \`${inventory.Tiger_Wood}\``;
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
            name: `${interaction.user.username}'s Inventory`,
          })
          .setDescription(
            `
Welcome to the inventory! Here you can see what you have gotten in your journey!
${userInventoryPickaxe}
${userStone}
${userIron}
${userDiamond}

${userInventorySword}
${userString}
${userLeather}
${userWolf_Teeth}

${userInventoryAxe}
${userOak_Wood}
${userMaple_Wood}
${userTiger_Wood}
          `
          )
          .setColor("BLURPLE")
          .setFooter({ text: `Requested by ${interaction.user.tag}` })
          .setTimestamp(),
      ],
    });
  },
};
