const { CommandInteraction, MessageEmbed, User } = require("discord.js");
const UserInventory = require("../../Structures/Schema/UserInventory");

module.exports = {
  name: "mine",
  description: "Mine some items.",
  permission: "SEND_MESSAGES",
  type: "Economy",
  usage: "`Under Development`",
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    //if (interaction.user.id !== "452436342841016341") {
    //  return interaction.reply({
    //    content: "This command is under development.",
    //    ephemeral: true,
    //  });
    //}
    var findUser = await UserInventory.findOne({ user: interaction.user.id });
    if (!findUser) {
      await UserInventory.create({ user: interaction.user.id });
    }
    var findUser = await UserInventory.findOne({ user: interaction.user.id });
    if (findUser.pickaxe.toString() === "{}") {
      return interaction.reply({
        content:
          "You do not own a pickaxe. Run `/forge craft:pickaxe` to get a pickaxe.",
        ephemeral: true,
      });
    }

    const cooldown = findUser.cooldown;
    interaction.reply({
      embeds: [
        new MessageEmbed()
          .setAuthor({ name: "Mining" })
          .setDescription(
            "You started mining with your trust pickaxe, and will only come back with suprises **in 15 minutes**."
          )
          .setColor("DARK_NAVY")
          .setFooter({ name: `Requested by ${interaction.user.tag}` })
          .setTimestamp(),
      ],
    });
  },
};
