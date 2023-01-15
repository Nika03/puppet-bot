const { serialize } = require("bson");
const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "fadaucr",
  description: "Find and delete all unused custom roles.",
  permission: "ADMINISTRATOR",
  type: "Utility",
  usage: "`/fadaucr`",

  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const guild = client.guilds.cache.get("946518364216520774");
    let roles = 0;
    await interaction.deferReply();
    guild.roles.cache.forEach((r) => {
      if (r.members.size == 0 && r.name.endsWith("(Custom)")) {
        r.delete();
        roles++;
      }
    });
    interaction.editReply(`Deleted ${roles} unused custom roles.`);
  },
};
