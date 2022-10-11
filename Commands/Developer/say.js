const { CommandInteraction, MessageEmbed, Message } = require("discord.js");

module.exports = {
  name: "say",
  description: "Say something. Staff only.",
  permission: "MANAGE_MESSAGES",
  options: [
    {
      name: `message`,
      description: `The message to send.`,
      required: true,
      type: `STRING`,
    },
    {
      name: `channel`,
      description: `The channel to send the message.`,
      required: true,
      type: `CHANNEL`,
      channelTypes: [`GUILD_TEXT`],
    },
  ],
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    //Change this

    const role_to_ping = `963473020108824647`; // Neco Arc Server
    //const role_to_ping = `993169053906636890` // Test server

    //Change this
    const member = await interaction.guild.members.fetch(interaction.user.id);
    if (member.roles.cache.has("869321121449779270")) {
      return interaction.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: `Missing permissions` })
            .setDescription(
              `You dont have enough permissions to run this command!`
            ),
        ],
      });
    }
    const message = interaction.options.getString(`message`);
    const c = interaction.options.getChannel(`channel`);
    const channel = interaction.guild.channels.cache.get(c.id);
    if (
      channel
        .permissionsFor(interaction.guild.me)
        .toArray()
        .includes(`VIEW_CHANNEL`) === false
    ) {
      return interaction.reply({
        content: `I cannot see that channel!`,
        ephemeral: true,
      });
    } else if (
      channel
        .permissionsFor(interaction.guild.me)
        .toArray()
        .includes(`SEND_MESSAGES`) === false
    ) {
      return interaction.reply({
        content: `I cannot send messages in that channel.`,
        ephemeral: true,
      });
    }
    //if(message.includes(`@everyone`)){
    // return interaction.reply({content: `Failed to send your message, try again!`, ephemeral: true})
    //} else if (message.includes(`@here`)) {
    // return interaction.reply({content: `Failed to send your message, try again!`, ephemeral: true})
    //}
    interaction.reply({
      content: `Sent message to ${channel}!`,
      ephemeral: true,
    });
    channel.send({
      content: message,
      allowedMentions: {
        roles: [role_to_ping],
      },
    });
    console.log(
      `${interaction.user.id} ${interaction.user.tag} has sent \`${message}\` to ${channel.name}.`
    );
  },
};
