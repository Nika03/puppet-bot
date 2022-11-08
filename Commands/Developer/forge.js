const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "forge",
  description: "Forge some items.",
  permission: "SEND_MESSAGES",
  type: "Economy",
  usage: "`Under development.`",

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
  },
};
