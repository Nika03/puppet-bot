const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  id: "event_button",
  permission: "SEND_MESSAGES",

  async execute(interaction, client) {
    interaction.deferUpdate();
    interaction.message.edit({
      embeds: [
        new MessageEmbed()
          .setAuthor({ name: "Click the Button" })
          .setDescription(
            `${interaction.user} was the first one to click the button. They win... nothing.`
          )
          .setColor("DARK_NAVY"),
      ],
      components: [
        new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId(`event_button`)
            .setLabel(`button`)
            .setStyle(`SUCCESS`)
            .setDisabled(true)
        ),
      ],
    });
    client.buttonclicked = true;
  },
};
