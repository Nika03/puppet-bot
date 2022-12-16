const { Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "threadCreate",
  /**
   * @param {Client} client
   * @param {Guild} guild
   */
  async execute(thread, newlyCreated, client) {
    const guild = client.guilds.cache.get("946518364216520774");
    const threadOwner = guild.members.cache.get(thread.ownerId);
    if (threadOwner.roles.cache.has("1053421613502173345")) {
      thread.delete();
    }
  },
};
