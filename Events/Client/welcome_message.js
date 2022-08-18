const { Client } = require("discord.js");

module.exports = {
  name: "guildMemberUpdate",
  /**
   * @param {Client} client
   * @param {Guild} guild
   */
  async execute(newMember, oldMember, client) {
    console.log(newMember._roles, oldMember._roles);
  },
};
