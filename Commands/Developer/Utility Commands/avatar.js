const { CommandInteraction, MessageEmbed } = require("discord.js");
module.exports = {
  name: "avatar",
  description: "Check someone's avatar.",
  permission: "SEND_MESSAGES",
  type: "Utility",
  usage: "`/avatar, /avatar [user]`",
  options: [
    {
      name: "user",
      description: "The user to check.",
      type: "USER",
      required: false,
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
      if (!is_blacklisted.commands.includes("avatar")) {
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
    if (interaction.toString().includes("/avatar user:")) {
      const user = interaction.options.getUser("user");
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: `${user.tag}'s avatar.` })
            .setImage(user.avatarURL())
            .setColor("GREEN"),
        ],
      });
    } else {
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: `${interaction.user.tag}'s avatar.` })
            .setImage(interaction.user.avatarURL())
            .setColor("GREEN"),
        ],
      });
    }
  },
};
