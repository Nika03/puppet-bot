const { CommandInteraction, MessageEmbed, Message } = require("discord.js");

module.exports = {
  name: "setstatus",
  description: "Change the bot's status.",
  permission: "ADMINISTRATOR",
  type: "Other",
  usage: "`/setstatus [type] [status]`",
  options: [
    {
      name: `type`,
      description: `The type of the status`,
      required: true,
      type: `STRING`,
      choices: [
        {
          name: "Listening",
          value: "LISTENING",
        },
        {
          name: "Playing",
          value: "PLAYING",
        },
        {
          name: "Streaming",
          value: "STREAMING",
        },
        {
          name: "Watching",
          value: "WATCHING",
        },
      ],
    },
    {
      name: `status`,
      description: `The status for the bot.`,
      required: true,
      type: `STRING`,
    },
  ],
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const statustype = await interaction.options.getString("type");
    const status = await interaction.options.getString("status");

    try {
      client.user.setActivity(status, { type: statustype });
    } catch (e) {
      console.log(e);
      client.acterr = true;
      return interaction.reply(
        `There was an error setting the bot's status, ${e.toString()}`
      );
    }
    if (!client.acterr) {
      interaction.reply({
        content: `Successfuly changed the bot's status to:\nStatus: \`${status}\`\nStatus Type: \`${statustype}\``,
        ephemeral: true,
      });
    }
  },
};
