const { Message, MessageEmbed, Client } = require("discord.js");

module.exports = {
  name: "messageCreate",
  /**
   * @param {Message} message
   * @param {Client} client
   */
  async execute(message, client) {
    const filter = [
      "nigga",
      "niggas",
      "nigger",
      "niggers",
      "niga",
      "nigas",
      "niger",
      "nigers",
    ];
    stopf = false;
    x = 0;
    ax = 0;
    const array = message.toString().split(" ");
    do {
      if (message.author.bot) return;
      if (ax === array.length) {
        stopf = true;
        return;
      }
      if (array[ax] === filter[x]) {
        message.delete();
        const guild = client.guilds.cache.get("946518364216520774");
        const channel = guild.channels.cache.get(message.channel.id);
        const RestartsModel = require("../../Structures/Schema/Restarts");
        const restart = await RestartsModel.findOne();
        channel.send({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: `Case ${restart.cases}` })
              .setDescription(
                `${message.author} (${message.author.id}) has been banned for triggering the filter.`
              )
              .setColor("DARK_NAVY")
              .setTimestamp(),
          ],
        });
        const CasesModel = require("../../Structures/Schema/Cases");
        await CasesModel.create({
          punisher: `986354647688179742`,
          punished: `${message.author.id}`,
          type: "ban",
          reason: "Automaticly banned for triggering the filter.",
          time: Math.floor(Date.now() / 1000 + 86400),
          expired: false,
          case: restart.cases,
        });
        restart.cases++;
        await restart.save();
        const member = guild.members.cache.get(message.author.id);
        try {
          member.send({
            embeds: [
              new MessageEmbed()
                .setColor("DARK_NAVY")
                .setDescription(
                  `You have been banned in **Neco Puppeteers' Cult for: \`Triggering the filter\`. You have been banned for **1 day** and this ban cannot be appealed. discord.gg/puppet`
                ),
            ],
          });
        } catch (e) {
          console.log(e);
        }
        setTimeout(() => {
          guild.members.ban(message.author.id).catch((e) => {
            console.log(e);
          });
        }, 1000);
        stopf = true;
      } else {
        if (x >= filter.length) {
          ax++;
          x = 0;
        } else {
          x++;
        }
      }
    } while (stopf === false);
  },
};
