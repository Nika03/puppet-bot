const { CommandInteraction, MessageEmbed } = require("discord.js");
const axios = require("axios");
const { reverseimageapikey } = require("../../../Structures/config.json");

module.exports = {
  name: "reverse-search",
  description: "Reverse search an image.",
  permission: "SEND_MESSAGES",
  type: "Utility",
  usage: "`/reverse-search [url]`",
  options: [
    {
      name: "url",
      description: "The URL of the image.",
      type: "STRING",
      required: true,
    },
  ],
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const url = interaction.options.getString("url");
    interaction.deferReply({ ephemeral: true });
    function isValidURL(url) {
      try {
        return Boolean(new URL(url));
      } catch (e) {
        return false;
      }
    }
    if (isValidURL(url) === false) {
      return interaction.editReply({
        content: `\`${url}\` is not a valid url.`,
        ephemeral: true,
      });
    }

    const options = {
      method: "GET",
      url: "https://reverse-image-search-by-copyseeker.p.rapidapi.com/",
      params: { imageUrl: `${url}` },
      headers: {
        "X-RapidAPI-Key": reverseimageapikey,
        "X-RapidAPI-Host": "reverse-image-search-by-copyseeker.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        const match = response.data.Pages[0];
        if (!match) {
          return interaction.editReply({ content: "No matches found." });
        }
        const image = match.MatchingImages[0];
        interaction.editReply({
          embeds: [
            new MessageEmbed()
              .setAuthor({
                name: `${response.data.Pages.length} matches found`,
              })
              .setDescription(
                `
Image found:

Origin: ${match.Url}
Matching Percentage: \`${match.Rank * 10} / 100\`
            `
              )
              .setImage(image)
              .setFooter({ text: `Requested by ${interaction.user.tag}` })
              .setTimestamp()
              .setColor("BLURPLE"),
          ],
        });
      })
      .catch(function (error) {
        console.error(error);
        return interaction.editReply({
          content: "Something went wrong. (The link may not be valid.)",
        });
      });
  },
};
