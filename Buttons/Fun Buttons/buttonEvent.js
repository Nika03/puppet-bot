const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  id: "event_button",
  permission: "SEND_MESSAGES",

  async execute(interaction, client) {
    interaction.deferUpdate();
    const stoptimer = Date.now() / 1000 - client.buttontimer;
    const time = `${
      interaction.user.tag
    } clicked the button in ${stoptimer.toFixed(1)} seconds.`;
    interaction.message.edit({
      embeds: [
        new MessageEmbed()
          .setAuthor({ name: "Click the Button" })
          .setDescription(
            `${interaction.user} was the first one to click the button. They win... nothing.`
          )
          .setColor(interaction.guild.me.displayHexColor || "DARK_RED")
          .setFooter({ text: `${time}` }),
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
