const {
  CommandInteraction,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require("discord.js");

module.exports = {
  name: "clickthebutton",
  description: "Force the button event in general.",
  permission: "MANAGE_MESSAGES",
  type: "Fun",
  usage: "`/clickthebutton, /clickthebutton no-time`",
  options: [
    {
      name: "no-time",
      description: "No time.",
      type: "BOOLEAN",
      required: false,
    },
  ],
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const notime = interaction.options.getBoolean("no-time");
    client.buttonclicked = false;
    client.buttontimer = Date.now() / 1000;
    interaction.reply({
      embeds: [
        new MessageEmbed()
          .setAuthor({ name: "Click the Button" })
          .setDescription("The event is simple, click the button. No rewards.")
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
    });
    if (!notime) {
      setTimeout(() => {
        if (client.buttonclicked === false) {
          interaction.editReply({
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
    }
  },
};
