const { CommandInteraction, MessageEmbed } = require("discord.js");
const os = require("node:os");

module.exports = {
  name: "status",
  description: "Gives you the bot's status.",
  permission: "ADMINISTRATOR",
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const uptime = os.uptime();
    if (uptime < 60) {
      client.ut = `${uptime} seconds`;
    } else if (uptime < 3600) {
      client.ut = `${parseFloat(uptime / 60).toFixed(1)} minutes`;
    } else if (uptime < 86400) {
      client.ut = `${parseFloat(uptime / 3600).toFixed(1)} hours`;
    } else if (uptime < 2592000) {
      client.ut = `${parseFloat(uptime / 86400).toFixed(1)} days`;
    } else if (uptime < 31536000) {
      client.ut = `${parseFloat(uptime / 2592000).toFixed(1)} months`;
    } else {
      client.ut = `${parseFloat(uptime / 31536000).toFixed(1)} years`;
    }
    interaction.reply({
      embeds: [
        new MessageEmbed().setDescription(`
Uptime: \`${client.ut}\`
${parseFloat(os.freemem() / 1000000000).toFixed(1)} / ${parseFloat(
          os.totalmem() / 1000000000
        ).toFixed(1)} used memory (GB)
OS: ${os.version()} (${os.platform()})
        `),
      ],
    });
  },
};
