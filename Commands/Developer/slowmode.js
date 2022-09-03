const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "slowmode",
  description: "View and change the slowmode of the channel.",
  permission: "MANAGE_MESSAGES",
  options: [
    {
      name: "time",
      description: "The time of the slowmode.",
      type: "NUMBER",
      required: false,
    },
  ],
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const channel = interaction.guild.channels.cache.get(
      interaction.channel.id
    );
    if (interaction.toString() === "/slowmode") {
      if (!channel.rateLimitPerUser) {
        interaction.reply("This channe does not have slowmode on.");
      } else {
        interaction.reply(
          `The slowmode for this channel is **${channel.rateLimitPerUser}** seconds.`
        );
      }
    }
  },
};
