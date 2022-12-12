const { Client, MessageEmbed } = require("discord.js");
/**
 *
 * @param {Client} client
 */
module.exports = (client) => {
  process.on("unhandledRejection", (reason, p) => {
    const guild = client.guilds.cache.get("946518364216520774");
    const logs = guild.channels.cache.get("1051956107511332975");

    p.catch((p) => {
      logs.send({
        content: "@everyone, an `unhandledRejection` occured.",
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: `${reason}` })
            .setDescription(
              `Something went wrong at <t:${Math.floor(
                Date.now() / 1000
              )}> (${Math.floor(Date.now() / 1000)}).`
            )
            .addFields({ name: "Error", value: `\`\`\`${p}\`\`\`` }),
        ],
      });
    });
  });
  process.on("uncaughtException", (reason, p) => {
    const guild = client.guilds.cache.get("946518364216520774");
    const logs = guild.channels.cache.get("1051956107511332975");
    p.catch((p) => {
      logs.send({
        content: "@everyone, an `uncaughtException` occured.",
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: `${reason}` })
            .setDescription(
              `Something went wrong at <t:${Math.floor(
                Date.now() / 1000
              )}> (${Math.floor(Date.now() / 1000)}).`
            )
            .addFields({ name: "Error", value: `\`\`\`${p}\`\`\`` }),
        ],
      });
    });
  });
};
