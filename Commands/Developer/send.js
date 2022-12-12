const {
  CommandInteraction,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require("discord.js");
const User = require("../../Structures/Schema/User");

module.exports = {
  name: "send",
  description: "Send a programmed message to a certain channel.",
  permission: "ADMINISTRATOR",
  type: "Forbidden",
  usage: "`/send`",
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (interaction.user.id !== "452436342841016341") return;
    interaction.reply("I am a message");
    setTimeout(() => {
      interaction.editReply("I am also a message");
    }, 2500);
  },
};
