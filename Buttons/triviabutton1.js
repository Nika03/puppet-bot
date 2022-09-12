const { MessageEmbed } = require("discord.js");
module.exports = {
  id: `trivia1`,
  permission: "SEND_MESSAGES",

  async execute(interaction, client) {
    if (client.alreadyawnsered.includes(interaction.user.id)) {
      return interaction.reply({
        content: "You already replied to this trivia.",
        ephemeral: true,
      });
    }
    if (client.correctbutton === interaction.customId) {
      interaction.deferUpdate();
      interaction.message.edit({
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: "Trivia Event" })
            .setDescription(
              `${interaction.user} has won the trivia event! They have been awarded with nothing... for now!`
            ),
        ],
        components: [],
      });
      client.triviatimeout = false;
    } else {
      interaction.reply({
        content:
          "That is not the correct awnser! You can no longer awnser this trivia.",
        ephemeral: true,
      });
      client.alreadyawnsered.push(interaction.user.id);
    }
  },
};
