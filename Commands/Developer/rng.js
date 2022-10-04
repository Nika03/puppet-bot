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
    arr = [];
    rng = Date.now() * os.freemem();
    do {
      rng = rng / 2;
      if (rng > 100) {
        arr.push(rng);
      }
    } while (rng > 1);
    arrNumbers = 0;
    arr.forEach((n) => {
      arrNumbers = arrNumbers + n;
    });
    x = parseFloat(Math.floor(Date.now() + arrNumbers)).toFixed();
    //rng = arr[x];
    interaction.reply({ content: `${x}` });
  },
};
