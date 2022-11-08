const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  id: "wooden_pickaxe",
  permission: "SEND_MESSAGES",

  async execute(interaction, client) {
    console.log(interaction);
  },
};
