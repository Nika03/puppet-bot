const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  id: "wooden_pickaxe_button",
  permission: "SEND_MESSAGES",
  async execute(interaction, client) {
    console.log(interaction);
    userConfirmationArray = new Array();
    userConfirmationArray[interaction.message.id] = [interaction.user.id];
    if (interaction.message.interaction.user.id !== interaction.user.id)
      return interaction.deferUpdate();
    interaction.reply({
      content:
        "Are you sure you want to craft **Wooden Pickaxe?** You cannot get a refund.",

      components: [
        new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId("yes")
            .setLabel("Yes")
            .setStyle("SUCCESS"),
          new MessageButton()
            .setCustomId("no")
            .setLabel("No")
            .setStyle("DANGER")
        ),
      ],
    });
  },
};
