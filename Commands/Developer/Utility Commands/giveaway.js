const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "giveaway",
  description: "Start a giveaway!",
  permission: "ADMINISTRATOR",
  type: "Utility",
  usage:
    "`/giveaway [item] [time] [winners] [requirements], /giveaway [reroll]`",
  options: [
    {
      name: "item",
      description: "The item to give away.",
      type: "STRING",
      required: true,
    },
  ],
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {},
};
