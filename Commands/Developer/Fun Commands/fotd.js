const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "fotd",
  description: "Suggest a fact of the day to be sent.",
  permission: "SEND_MESSAGES",
  type: "Fun",
  usage: "`/fotd [suggestion]`",
  options: [
    {
      name: "suggestion",
      description: "The suggestion to be sent to the staff team.",
      type: "STRING",
      required: true,
    },
  ],
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const SettingsModel = require("../../../Structures/Schema/Settings.js");
    const is_blacklisted = await SettingsModel.findOne({
      channel: interaction.channel.id,
    });
    if (is_blacklisted !== null) {
      if (!is_blacklisted.commands.includes(`fotd`)) {
        return interaction.reply({
          embeds: [
            new MessageEmbed().setDescription(
              `This command has been disabled in this channel.`
            ),
          ],
          ephemeral: true,
        });
      }
    } else if (!is_blacklisted) {
      return interaction.reply({
        embeds: [
          new MessageEmbed().setDescription(
            `This command has been disabled in this channel.`
          ),
        ],
        ephemeral: true,
      });
    }
    const suggestion = interaction.options.getString("suggestion");
    const guild = client.guilds.cache.get("946518364216520774");
    const channel = guild.channels.cache.get("1010273015658983524");
    interaction.reply({
      content: "Your suggestion has been sent to the staff team!",
      ephemeral: true,
    });
    channel.send({
      embeds: [
        new MessageEmbed()
          .setAuthor({ name: "FOTD Suggestion" })
          .setDescription(
            `
          ${suggestion}
        
**DONT FORGET TO CREDIT AND REACT TO THIS MESSAGE IF THIS HAS BEEN USED**
          `
          )
          .setColor("BLUE")
          .setFooter({
            text: `This was suggested by ${interaction.user.tag}.`,
          })
          .setTimestamp(),
      ],
    });
  },
};
