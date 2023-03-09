const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "lockserver",
  description: "Lockdown the server.",
  permission: "ADMINISTRATOR",
  type: "Moderation",
  usage: "`/lockserver`",
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const guild = client.guilds.cache.get(interaction.guild.id);
    const channels = guild.channels.cache;
    const categories = [
      "963181651570085989",
      "946518364216520775",
      "946523255995506738",
      "968621674008281130",
      "986243611484127302",
      "963502912116490290",
      "984940251883651112",
    ];
    interaction.reply("Locking the server... This may take a while...");
    lockableChannels = 0;
    channels.forEach((c) => {
      if (c.type === "GUILD_VOICE") return;
      if (c.type === "GUILD_CATEGORY") return;
      if (c.type === "GUILD_PUBLIC_THREAD") return;
      if (c.type === "GUILD_PRIVATE_THREAD") return;
      if (!c.parentId) return;
      if (categories.includes(c.parentId)) return;
      lockableChannels++;
    });
    totalChannelsLocked = 0;
    channelCounter = 0;
    channels.forEach(async (c) => {
      setTimeout(() => {
        try {
          if (c.type === "GUILD_VOICE") return;
          if (c.type === "GUILD_CATEGORY") return;
          if (c.type === "GUILD_PUBLIC_THREAD") return;
          if (c.type === "GUILD_PRIVATE_THREAD") return;
          if (!c.parentId) return;
          if (categories.includes(c.parentId)) return;
          totalChannelsLocked++;
          c.permissionOverwrites.edit("946524059724820500", {
            SEND_MESSAGES: false,
          });
          c.permissionOverwrites.edit("946525021545828422", {
            SEND_MESSAGES: false,
          });
          c.send({
            embeds: [
              new MessageEmbed()
                .setAuthor({ name: "Channel locked" })
                .setDescription(
                  `Nya! <#${c.id}> has been locked! Our staff have decided to lock the channel, but dont worry! It will be unlocked soon! *If you have any issues during the lockdown, make a ticket in <#946523109924696074>*`
                )
                .setColor(interaction.guild.me.displayHexColor || "DARK_RED")
                .setTimestamp(),
            ],
          });
          if (totalChannelsLocked === lockableChannels) {
            interaction.channel.send(
              `Server has been locked down. (Took ${
                (totalChannelsLocked * 250) / 1000
              } seconds)`
            );
            return;
          }
        } catch (e) {
          console.log(e.toString());
        }
      }, channelCounter * 250);
      channelCounter++;
    });
    const logs = guild.channels.cache.get("1009968902941442119");
    logs.send({
      embeds: [
        new MessageEmbed()
          .setAuthor({ name: "Server Locked" })
          .setDescription(`${interaction.user} has locked down the server.`)
          .setColor(interaction.guild.me.displayHexColor || "DARK_GOLD")
          .setTimestamp(),
      ],
    });
  },
};
