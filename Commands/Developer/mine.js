const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "mine",
  description: "Mine some items.",
  permission: "SEND_MESSAGES",
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    interaction.reply(
      "I am not adding this command anytime soon. - <@!452436342841016341> at <t:1662403856>"
    );
  },
};
