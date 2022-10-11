const { Message, MessageEmbed, Client } = require("discord.js");
const axios = require("axios");
const { moderatecontentkey } = require("../../Structures/config.json");

module.exports = {
  name: "messageCreate",
  /**
   * @param {Message} message
   * @param {Client} client
   */
  async execute(message, client) {
    const guild = client.guilds.cache.get("946518364216520774");
    if (message.toString().startsWith("https")) {
      axios
        .get("https://api.moderatecontent.com/moderate/", {
          params: {
            key: moderatecontentkey,
            url: message.toString(),
          },
        })
        .then((response) => {
          try {
            if (response.data.predictions.adult > 75) {
              const channel = guild.channels.cache.get(message.channel.id);
              try {
                message.delete();
                channel.send({
                  content: `${message.author}`,
                  embeds: [
                    new MessageEmbed()
                      .setDescription(
                        "Your message has been deleted due to containing sensitive content."
                      )
                      .setColor("BLURPLE"),
                  ],
                });
              } catch (e) {
                console.log(e.toString());
              }
            }
            const logs = guild.channels.cache.get("1028748150149763092");
            logs.send({
              embeds: [
                new MessageEmbed()
                  .setDescription(
                    `
${message.author} (${message.author.id}) sent an image in ${message.channel}.

Adult rating: \`${response.data.predictions.adult}\`
Everyone rating: \`${response.data.predictions.everyone}\`
Teen rating: \`${response.data.predictions.teen}\`
            `
                  )
                  .setColor("BLURPLE")
                  .setImage(`${message.toString()}`),
              ],
            });
          } catch (e) {
            if (
              !e.toString(
                "TypeError: Cannot read properties of undefined (reading 'adult')"
              )
            ) {
              console.log(e);
            }
          }
        });
    } else if (message.attachments.size < 1) {
      return;
    } else {
      message.attachments.every((m) => {
        if (m.url.endsWith(".mov")) return;
        if (m.url.endsWith(".mp4")) return;
        axios
          .get("https://api.moderatecontent.com/moderate/", {
            params: {
              key: moderatecontentkey,
              url: m.url,
            },
          })
          .then((response) => {
            if (response.data.predictions.adult > 75) {
              const channel = guild.channels.cache.get(message.channel.id);
              if (message.attachments.size > 1) {
                message.delete();
                channel.send({
                  content: `${message.author}`,
                  embeds: [
                    new MessageEmbed()
                      .setDescription(
                        "Your message has been deleted due to containing sensitive content."
                      )
                      .setColor("BLURPLE"),
                  ],
                });
                const logs = guild.channels.cache.get("1028748150149763092");
                logs.send({
                  embeds: [
                    new MessageEmbed()
                      .setDescription(
                        `
  ${message.author} (${message.author.id}) sent an image in ${message.channel}.
  
  Adult rating: \`${response.data.predictions.adult}\`
  Everyone rating: \`${response.data.predictions.everyone}\`
  Teen rating: \`${response.data.predictions.teen}\`
              `
                      )
                      .setColor("BLURPLE")
                      .setImage(`${m.url}`),
                  ],
                });
                return;
              }
              message.delete();
              channel.send({
                content: `${message.author}`,
                embeds: [
                  new MessageEmbed()
                    .setDescription(
                      "Your message has been deleted due to containing sensitive content."
                    )
                    .setColor("BLURPLE"),
                ],
              });
            }
            const logs = guild.channels.cache.get("1028748150149763092");
            logs.send({
              embeds: [
                new MessageEmbed()
                  .setDescription(
                    `
  ${message.author} (${message.author.id}) sent an image in ${message.channel}.
  
  Adult rating: \`${response.data.predictions.adult}\`
  Everyone rating: \`${response.data.predictions.everyone}\`
  Teen rating: \`${response.data.predictions.teen}\`
              `
                  )
                  .setColor("BLURPLE")
                  .setImage(`${m.url}`),
              ],
            });
          });
      });
    }
  },
};
