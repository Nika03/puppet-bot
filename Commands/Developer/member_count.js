const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "membercount",
  description: "Check the server's membercount.",
  permission: "SEND_MESSAGES",
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const guild = client.guilds.get("946518364216520774");
    interaction.reply({
      embeds: [
        new MessageEmbed()
          .setAuthor({ name: "Total Members" })
          .setDescription(
            `There are **${guild.memberCount}** members in this server.`
          )
          .setColor("GREEN")
          .setFooter({ text: `Requested by ${interaction.user.tag}` })
          .setTimestamp(),
      ],
    });
  },
};
