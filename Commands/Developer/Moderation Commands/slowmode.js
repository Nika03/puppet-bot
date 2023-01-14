const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "slowmode",
  description: "View and change the slowmode of the channel.",
  permission: "MANAGE_MESSAGES",
  type: "Utility",
  usage: "`/slowmode, /slowmode [time]`",
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
   */
  async execute(interaction) {
    const channel = interaction.guild.channels.cache.get(
      interaction.channel.id
    );
    if (interaction.toString() === "/slowmode") {
      if (!channel.rateLimitPerUser) {
        interaction.reply(`${interaction.channel} does not have slowmode on.`);
      } else {
        interaction.reply(
          `The slowmode for ${interaction.channel} is **${channel.rateLimitPerUser}** seconds.`
        );
      }
    } else {
      const seconds = interaction.options.getNumber("time");
      channel.setRateLimitPerUser(seconds, [
        `${interaction.user.tag} changed the slowmode.`,
      ]);
      if (seconds === 0) {
        return interaction.reply(
          `The slowmode in ${interaction.channel} has been removed.`
        );
      }
      interaction.reply(
        `The slowmode in ${interaction.channel} has been changed to **${seconds}** seconds.`
      );
    }
  },
};
