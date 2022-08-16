const { Client } = require("discord.js");

module.exports = {
  name: "guildMemberAdd",
  /**
   * @param {Client} client
   * @param {Guild} guild
   */
  async execute(member, client) {
    const RestartsModel = require("../../Structures/Schema/Restarts");
    const status = await RestartsModel.findOne();
    if (status.verification === false) {
      //Change this
      //const g = "986357448925401168"; //Test server id
      const g = "946518364216520774"; //Puppet server id
      //const verified = "993169053906636890"; //Test server id
      const verified = "993169053906636890"; //Puppet server id

      const guild = client.guilds.cache.get(g);

      const user = await guild.members.fetch(member.id);
      try {
        user.roles.add(verified);
      } catch (e) {
        console.log(e);
      }
    }
  },
};
