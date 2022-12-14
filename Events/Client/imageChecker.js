const { Message, MessageEmbed, Client } = require("discord.js");
const axios = require("axios");
const RestartsModel = require("../../Structures/Schema/Restarts");
const tf = require("@tensorflow/tfjs-node");
const nsfw = require("nsfwjs");

module.exports = {
  name: "messageCreate",
  /**
   * @param {Message} message
   * @param {Client} client
   */
  async execute(message, client) {
    const setting = await RestartsModel.findOne();
    if (!setting.imageFilter) return;
    if (message.channel.id === "1029474001648623726") return;
    if (message.channel.id === "963190186303434863") return;
    const guild = client.guilds.cache.get("946518364216520774");
    const logs = guild.channels.cache.get("1028748150149763092");
    global.attachmentURL = false;
    if (message.attachments.size !== 0) {
      if (message.attachments.size === 1) {
        message.attachments.forEach((m) => {
          global.attachmentURL = m.url;
        });
      } else {
        var shouldSkip = false;
        message.attachments.every(async (m) => {
          const pic = await axios.get(m.url, {
            responseType: "arraybuffer",
          });
          const model = await nsfw.load();
          const image = await tf.node.decodeImage(pic.data, 3);
          const predictions = await model.classify(image);
          image.dispose();
          logs.send({
            embeds: [
              new MessageEmbed()
                .setDescription(
                  `
${message.author} (${message.author.id}) sent an image in ${message.channel}.

${predictions[0].className} rating: \`${predictions[0].probability * 100}\`
${predictions[1].className} rating: \`${predictions[1].probability * 100}\`
${predictions[2].className} rating: \`${predictions[2].probability * 100}\`
${predictions[3].className} rating: \`${predictions[3].probability * 100}\`
${predictions[4].className} rating: \`${predictions[4].probability * 100}\`

            `
                )
                .setColor("BLURPLE")
                .setImage(`${m.url}`),
            ],
          });
          if (
            predictions[0].className === "Hentai" &&
            predictions[0].probability < 90
          ) {
            if (shouldSkip === false) {
              message.delete();
            }
            shouldSkip = true;
          } else if (
            predictions[0].className === "Porn" &&
            predictions[0].probability < 90
          ) {
            if (shouldSkip === false) {
              message.delete();
            }
            shouldSkip = true;
          }
        });
        return;
      }
    }
    if (
      message.attachments.size !== 1 &&
      !message.toString().startsWith("https://")
    )
      return;
    if (global.attachmentURL == false) {
      global.attachmentURL = message.toString();
    }
    try {
      const pic = await axios.get(global.attachmentURL, {
        responseType: "arraybuffer",
      });
      const model = await nsfw.load();
      const image = await tf.node.decodeImage(pic.data, 3);
      const predictions = await model.classify(image);
      image.dispose();
      logs.send({
        embeds: [
          new MessageEmbed()
            .setDescription(
              `
${message.author} (${message.author.id}) sent an image in ${message.channel}.

${predictions[0].className} rating: \`${predictions[0].probability * 100}\`
${predictions[1].className} rating: \`${predictions[1].probability * 100}\`
${predictions[2].className} rating: \`${predictions[2].probability * 100}\`
${predictions[3].className} rating: \`${predictions[3].probability * 100}\`
${predictions[4].className} rating: \`${predictions[4].probability * 100}\`

          `
            )
            .setColor("BLURPLE")
            .setImage(`${global.attachmentURL}`),
        ],
      });
      if (
        predictions[0].className === "Hentai" &&
        predictions[0].probability < 90
      ) {
        message.delete();
      } else if (
        predictions[0].className === "Porn" &&
        predictions[0].probability < 90
      ) {
        message.delete();
      }
    } catch (e) {
      if (
        e.toString !== "AxiosError: Request failed with status code 404" &&
        e.toString() !==
          "Error: Expected image (BMP, JPEG, PNG, or GIF), but got unsupported image type"
      ) {
        console.log(e);
      }
    }
    //console.log(isImgUrl(message.toString()));
    //const pic = await axios.get(message.toString(), {
    //  responseType: "arraybuffer",
    //});
    //const model = await nsfw.load();
    //const image = await tf.node.decodeImage(pic.data, 3);
    //const predictions = await model.classify(image);
    //image.dispose();
    //console.log(predictions);
  },
};
