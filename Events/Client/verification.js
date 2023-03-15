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
	//const g = "752104036102176778"; // nika server id
    //const verified = "993169053906636890"; //Test server id
    const verified = "946524059724820500"; // bur puppets (default)

    const guild = client.guilds.cache.get(g);
    const BlacklistModel = require("../../Structures/Schema/Blacklist");
    const findUser = await BlacklistModel.findOne({ user: user.id });
    if (findUser) return;

    const RestartsModel = require("../../Structures/Schema/Restarts");
    const verification = await RestartsModel.findOne();
    if (reaction.parcial) {
      await reaction.fetch();
    }
    if (!client.color) client.color = "red";
    if (reaction.message.channelId === "946528426687336559") { // verify-here
	//if (reaction.message.channelId === "1072243970261921792") { // static
      const member = await guild.members.fetch(user.id);
      if (reaction.emoji.name === client.color) {
        try {
          member.roles.add(verified);
          const guild = client.guilds.cache.get("946518364216520774");
          const puppets = guild.channels.cache.get("1009968902941442119"); // teto-log
		  puppets.send(
            `${user} has passed verification.`
          );
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          member.timeout(300000, "Failed the verification.");
        } catch (e) {
          console.log(e);
        }
      }
    }
  },
};
