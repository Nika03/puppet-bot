const { CommandInteraction, MessageEmbed } = require("discord.js");
const os = require("node:os");

module.exports = {
  name: "rng",
  description: "A test command to do completely random RNG.",
  permission: "MANAGE_MESSAGES",
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    rng = Date.now() * os.freemem();
    console.log(rng);
    do {
      rng = rng / 2;
    } while (rng < 100);
    interaction.reply({ content: `${rng}` });
  },
};
