const { CommandInteraction, MessageEmbed } = require("discord.js");

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
    const guild = client.guilds.cache.get("946518364216520774");
    const general = guild.channels.cache.get("946520764297912343");
    client.buttontimer = Date.now() / 1000;
    general
      .send({
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
