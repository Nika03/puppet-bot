const { CommandInteraction, MessageEmbed } = require("discord.js");
module.exports = {
  name: "avatar",
  description: "Check someone's avatar.",
  permission: "SEND_MESSAGES",
  options: [{
    name: 'user',
    description: 'The user to check.',
    type: 'USER',
    required: false
  }],
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const SettingsModel = require("../../Structures/Schema/Settings.js");
    const is_blacklisted = await SettingsModel.findOne({
      channel: interaction.channel.id,
    });
    if (is_blacklisted !== null) {
      if (!is_blacklisted.commands.includes('avatar')) {
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
    if(interaction.toString().includes('/avatar user:')){
        const user = interaction.options.getUser('user')
        interaction.reply({embeds: [
            new MessageEmbed()
            .setAvatar({name: `${user.tag}'s avatar.`})
            .setImage(user.avatarURL())
        ]})
    }
  },
};
