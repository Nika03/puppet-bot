const { Message, MessageEmbed, Client } = require("discord.js");
const axios = require("axios");

module.exports = {
  name: "messageCreate",
  /**
   * @param {Message} message
   * @param {Client} client
   */
  async execute(message, client) {
    if (message.attachments.size < 1) return;
    const imgC = require("../../Structures/Schema/Images");
    const imgCF = await imgC.find();
    if (!imgCF) await imgCF.create({ images: [] });
    imgarr = await imgC.find();
    var msgAtt = message.attachments;
    msgAtt.forEach(async (m) => {
      if (!imgarr.includes(m.url)) {
        imgarr.push(m.url);
      } else if (imgarr.includes(m.url)) {
        const guild = client.guilds.cache.get("946518364216520774");
        const logs = guild.channels.cache.get("1028748150149763092");
        logs.send({
          embeds: [
            new MessageEmbed().setAuthor({ name: `${message.author.tag}` })
              .setDescription(`
${message.author} (${message.author.id}) sent an image in ${message.channel}.
                `),
          ],
        });
        return;
      }
      await imgC.findOneAndUpdate({}, { images: imgarr });
      const options = {
        method: "POST",
        url: "https://nsfw-image-classification3.p.rapidapi.com/nsfwjs/check",
        headers: {
          "content-type": "application/json",
          "Content-Type": "application/json",
          "X-RapidAPI-Key":
            "a11b464787msh6ba6cd7b7a343aep170f9bjsn1b7482c0b935",
          "X-RapidAPI-Host": "nsfw-image-classification3.p.rapidapi.com",
        },
        data: `{"link":"${m.url}"}`,
      };

      axios
        .request(options)
        .then(function (response) {
          const guild = client.guilds.cache.get("946518364216520774");
          fileAttArr = [];
          response.data.forEach((f) => {
            fileAttArr.push(
              `Name: \`${f.className}\` Probability: \`${f.probability}\`\n`
            );
            if (f.className === "Hentai" || f.className === "Porn") {
              if (f.probability > 0.5) {
                message.delete();
                const channel = guild.channels.cache.get(message.channel.id);
                channel.send({
                  content: `${message.author}`,
                  embeds: [
                    new MessageEmbed()
                      .setDescription(
                        `
Your message was deleted due to containing sensitive content.
                    `
                      )
                      .setColor("BLURPLE"),
                  ],
                });
              }
            }
          });
          const logs = guild.channels.cache.get("1028748150149763092");
          logs.send({
            embeds: [
              new MessageEmbed()
                .setAuthor({ name: `${message.author.tag}` })
                .setDescription(
                  `
${message.author} (${message.author.id}) sent an image in ${message.channel}.
${fileAttArr.toString().replaceAll(",", "")}
                `
                )
                .setImage(m.url)
                .setColor("BLURPLE"),
            ],
          });
        })
        .catch(function (error) {
          console.error(error);
        });
    });
  },
};
