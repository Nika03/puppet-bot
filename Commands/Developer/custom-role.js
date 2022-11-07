const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "custom-role",
  description: "Create or modify your custom role.",
  permission: "SEND_MESSAGES",
  type: "Utility",
  usage: "`In development.`",

  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (interaction.user.id !== "452436342841016341") {
      return interaction.reply({
        content: "This command is currently being developed.",
        ephemeral: true,
      });
    }
  },
};
