const { Client } = require("discord.js");

module.exports = {
  name: "messageReactionAdd",
  /**
   * @param {Client} client
   * @param {Guild} guild
   */
  async execute(reaction, user, client) {
    //Change this
    //const g = "986357448925401168"; //Test server id
    const g = "946518364216520774"; //Puppet server id
    //const verified = "993169053906636890"; //Test server id
    const verified = "993169053906636890"; //Puppet server id

    const guild = client.guilds.cache.get(g);

    const RestartsModel = require("../../Structures/Schema/Restarts");
    const verification = await RestartsModel.findOne();
    if (verification.verification === false) return;
    if (reaction.parcial) {
      await reaction.fetch();
    }
    if (!client.color) client.color = "red";
    if (reaction.message.channelId === "986357448925401171") {
      const member = await guild.members.fetch(user.id);
      if (reaction.emoji.name === client.color) {
        try {
          member.roles.add(verified);
        } catch (e) {
          //ignored
        }
      } else {
        try {
          member.timeout(300000, "Failed the verification.");
        } catch (e) {
          //ignored
        }
      }
    }
  },
};
