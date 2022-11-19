const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  id: "no",
  permission: "SEND_MESSAGES",
  async execute(interaction, client) {
    if (interaction.message.interaction.user.id !== interaction.user.id)
      return interaction.deferUpdate();
    interaction.message.delete();
  },
};
