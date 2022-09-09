const {
  CommandInteraction,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require("discord.js");

module.exports = {
  name: "clickthebutton",
  description: "Force the button event in general.",
  permission: "ADMINISTRATOR",
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    client.buttonclicked = false;
    client.buttontimer = Date.now() / 1000;
    interaction
      .reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: "Click the Button" })
            .setDescription(
              "The event is simple, click the button. No rewards."
            )
            .setColor("DARK_NAVY"),
        ],
        components: [
          new MessageActionRow().addComponents(
            new MessageButton()
              .setCustomId(`event_button`)
              .setLabel(`button`)
              .setStyle(`SUCCESS`)
          ),
        ],
      })
      .then((message) => {
        setTimeout(() => {
          if (client.buttonclicked === false) {
            message.edit({
              embeds: [
                new MessageEmbed()
                  .setAuthor({ name: "Click the Button" })
                  .setDescription("Nobody clicked the button, shame.")
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
          }
        }, 15000);
      });
  },
};
