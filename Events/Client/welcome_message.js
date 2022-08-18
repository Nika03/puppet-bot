const { Client } = require("discord.js");

module.exports = {
  name: "guildMemberUpdate",
  /**
   * @param {Client} client
   * @param {Guild} guild
   */
  async execute(newMember, oldMember, client) {
    if (oldMember._roles.includes("970229987405877259")) {
      if (!newMember._roles.includes("970229987405877259")) {
        const c = "946520764297912343";
        const g = "946518364216520774";

        const guild = client.guilds.cache.get(g);
        const channel = guild.channels.cache.get(c);

        channel.send(`${oldMember} has been changed`);
      }
    }
  },
};
