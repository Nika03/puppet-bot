const { Client } = require("discord.js");

module.exports = {
  name: "guildMemberUpdate",
  /**
   * @param {Client} client
   * @param {Guild} guild
   */
  async execute(newMember, client) {
    console.log(newMember);
  },
};
