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
    const pickaxe = inventory.pickaxe;
    if (pickaxe.name !== "None") {
      userInventoryPickaxe = `\`${pickaxe.name}\` with **${pickaxe.durability}** durability.`;
    } else {
      userInventoryPickaxe = pickaxe.name;
    }
    const sword = inventory.sword;
    if (sword.name !== "None") {
      userInventorySword = `\`${sword.name}\` with **${sword.durability}** durability.`;
    } else {
      userInventorySword = sword.name;
    }

    const axe = inventory.axe;
    if (axe.name !== "None") {
      userInventoryAxe = `\`${axe.name}\` with **${axe.durability}** durability.`;
    } else {
      userInventoryAxe = axe.name;
    }

    interaction.reply({
      embeds: [
        new MessageEmbed()
          .setAuthor({ name: `${interaction.user.username}'s Inventory` })
          .addFields({
            name: "Mining Items",
            value: `Pickaxe: ${userInventoryPickaxe}
> Stone: ${inventory.Stone}
> Iron: ${inventory.Iron}
> Diamond: ${inventory.Diamond}
            `,
            inline: true,
          })
          .addFields({
            name: "Hunting Items",
            value: `Sword: ${userInventorySword}
> String: ${inventory.String}
> Leather: ${inventory.Leather}
> Wolf Teeth: ${inventory.Wolf_Teeth}
          `,
            inline: true,
          })
          .addFields({ name: "\u200B", value: "\u200B", inline: true })
          .addFields({
            name: "Foraging Items",
            value: `Axe: ${userInventoryAxe}
> Oak Wood: ${inventory.Oak_Wood}
> Maple Wood: ${inventory.Maple_Wood}
> Tiger Wood: ${inventory.Tiger_Wood}
          `,
            inline: true,
          })
          .setColor("NAVY")
          .setFooter({ text: `Requested by ${interaction.user.tag}` })
          .setTimestamp()
          .setDescription(
            "Welcome to the inventory system! Here you can see what you have stored from your journey!"
          ),
      ],
    });
  },
};
