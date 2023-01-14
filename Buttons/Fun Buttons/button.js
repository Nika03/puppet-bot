const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  id: "Button",
  permission: "SEND_MESSAGES",

  execute(interaction) {
    interaction.reply({ content: "no", ephemeral: true });
  },
};
