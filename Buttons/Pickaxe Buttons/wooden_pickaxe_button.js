const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  id: "wooden_pickaxe_button",
  permission: "SEND_MESSAGES",
  async execute(interaction, client) {
    if (interaction.message.interaction.user.id !== interaction.user.id)
      return interaction.deferUpdate();
    interaction.reply({
      content:
        "Are you sure you want to craft **Wooden Pickaxe?** You cannot get a refund.",
    });
  },
};
