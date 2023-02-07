const { Client, MessageEmbed } = require("discord.js");
/**
 *
 * @param {Client} client
 */
/* module.exports = (client) => {
  process.on("unhandledRejection", (reason, p) => {
    const guild = client.guilds.cache.get("752104036102176778");
    const logs = client.channels.cache.get("1071628325761585252");

    p.catch((p) => {
      logs.send({
        content: "<@!452436342841016341>, an `unhandledRejection` occured.",
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
    const guild = client.guilds.cache.get("752104036102176778");
    const logs = client.channels.cache.get("1071628325761585252");
    p.match((p) => {
      logs.send({
        content: "<@!452436342841016341>, an `uncaughtException` occured.",
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
}; */
