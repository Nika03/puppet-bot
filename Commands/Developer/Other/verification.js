const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "verification",
  description: "Disable or enable verification.",
  permission: "ADMINISTRATOR",
  type: "Other",
  usage: "`/verification`",
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const RestartsModel = require("../../../Structures/Schema/Restarts");
    const status = await RestartsModel.findOne();
    if (status.verification === true) {
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: "Verification" })
            .setDescription("Verification has been **disabled**.")
            .setColor(interaction.guild.me.displayHexColor || "DARK_RED")
            .setFooter({ text: `Requested by ${interaction.user.tag}` })
            .setTimestamp(),
        ],
      });
      status.verification = false;
      await status.save();
    } else if (status.verification === false) {
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: "Verification" })
            .setDescription("Verification has been **enabled**.")
            .setColor(interaction.guild.me.displayHexColor || "DARK_RED")
            .setFooter({ text: `Requested by ${interaction.user.tag}` })
            .setTimestamp(),
        ],
      });
      status.verification = true;
      await status.save();
    } else {
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: "Verification" })
            .setDescription("Verification has been **enabled.**")
            .setColor(interaction.guild.me.displayHexColor || "DARK_RED")
            .setFooter({ text: `Requested by ${interaction.user.tag}` })
            .setTimestamp(),
        ],
      });
      status.verification = true;
      await status.save();
    }
  },
};
