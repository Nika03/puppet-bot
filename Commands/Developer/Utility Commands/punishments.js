const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "punishments",
  description: "Check your own punishments.",
  permission: "SEND_MESSAGES",
  type: "Utility",
  usage: "`/punishments`",
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const CaseModel = require("../../../Structures/Schema/Cases");
    const arr = [];
    const c = await CaseModel.find();
    c.forEach((c) => {
      if (c.punished === interaction.user.id && c.expired === false) {
        arr.push(`Case **${c.case}**  • Type: **${c.type}**\n`);
      }
    });
    if (arr.length === 0) {
      return interaction.reply({
        content: "You dont have any active cases!",
        ephemeral: true,
      });
    }
    const str = arr.toString().replaceAll(",", "");
    interaction.reply({
      embeds: [
        new MessageEmbed()
          .setAuthor({
            name: `${interaction.member.user.tag}`,
            iconURL: `${interaction.member.user.avatarURL()}`,
          })
          .setColor("DARK_NAVY")
          .setDescription(`${str}`),
      ],
      ephemeral: true,
    });
  },
};
