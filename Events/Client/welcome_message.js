const { Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "guildMemberUpdate",
  /**
   * @param {Client} client
   */
  async execute(newMember, oldMember, client) {
    if (oldMember._roles.includes("946524059724820500")) {
      if (!newMember._roles.includes("946524059724820500")) {
        const c = "946520764297912343";
        const g = "946518364216520774";

        const guild = client.guilds.cache.get(g);
        const channel = guild.channels.cache.get(c);

        const r = Math.floor(Math.random() * 7);
        if (r === "1") {
          client.message = `${oldMember} is new here!`;
        } else if (r === "2") {
          client.message = `Oh look, ${oldMember} is finally here.`;
        } else if (r === "3") {
          client.message = `A very warm welcome to ${oldMember}`;
        } else if (r === "4") {
          client.message = `We have all gathered to see you, ${oldMember}.`;
        } else if (r === "5") {
          client.message = `${oldMember} came here very suddenly.`;
        } else if (r === "6") {
          client.message = `${oldMember} has traveled for a long time to find us.`;
        } else if (r === "7") {
          client.message = `${oldMember} has arrived at last.`;
        } else {
          client.message = `This is just the beginning for ${oldMember}.`;
        }
        channel.send({
          embeds: [
            new MessageEmbed()
              .setDescription(`${client.message}`)
              .setAuthor({ name: `Welcome ${oldMember.user.tag}` })
              .setImage(oldMember.user.displayAvatarURL),
          ],
        });
      }
    }
  },
};
