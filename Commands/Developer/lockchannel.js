const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "lockchannel",
  description: "Lockdown a channel.",
  permission: "MANAGE_MESSAGES",
  type: "Moderation",
  usage: "`/lockchannel`",
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const member = await interaction.guild.members.fetch(interaction.user.id);
    if (member.roles.cache.has("946525021545828422")) {
      return interaction.reply({
        content: "You are missing permissions.",
        ephemeral: true,
      });
    }
    const categories = [
      "963181651570085989",
      "946518364216520775",
      "946523255995506738",
      "968621674008281130",
      "986243611484127302",
      "963502912116490290",
      "984940251883651112",
    ];
    const guild = client.guilds.cache.get(interaction.guild.id);
    const channel = guild.channels.cache.get(interaction.channel.id);
    try {
      if (channel.type === "GUILD_VOICE")
        return interaction.reply({
          content: "This channel cannot be locked.",
          ephemeral: true,
        });
      if (channel.type === "GUILD_CATEGORY")
        return interaction.reply({
          content: "This channel cannot be locked.",
          ephemeral: true,
        });
      if (!channel.parentId)
        return interaction.reply({
          content: "This channel cannot be locked.",
          ephemeral: true,
        });
      if (categories.includes(channel.parentId))
        return interaction.reply({
          content: "This channel cannot be locked.",
          ephemeral: true,
        });
      channel.permissionOverwrites.edit("946524059724820500", {
        SEND_MESSAGES: false,
      });
      channel.permissionOverwrites.edit("946525021545828422", {
        SEND_MESSAGES: false,
      });
    } catch (e) {
      console.log(e);
    }
    interaction.reply(`${interaction.channel} has been locked down.`);
    const logs = guild.channels.cache.get("1009968902941442119");
    logs.send({
      embeds: [
        new MessageEmbed()
          .setAuthor({ name: "Channel Locked" })
          .setDescription(
            `${interaction.user} has locked down the channel ${interaction.channel}.`
          )
          .setColor("DARK_GOLD")
          .setTimestamp(),
      ],
    });
  },
};
