const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
module.exports = {
  id: "CASES_PREVIOUS_PAGE",
  permission: "MANAGE_MESSAGES",

  async execute(interaction, client) {
    if (interaction.message.interaction.user.id !== interaction.user.id)
      return interaction.deferUpdate();
    if (!client.casesArray) {
      interaction.deferUpdate();
      return interaction.message
        .edit({
          content: "This command has expired.",
          components: [],
          embeds: [],
        })
        .then((m) => {
          setTimeout(() => {
            m.delete();
          }, 3000);
        });
    }
    interaction.deferUpdate();
    casesPage--;
    previousPageFunction();
    casesX = casesX + 10;
    checkCaseButtonsFunction();
    caseVariables();
    const reversedArray = unfinishedArray.reverse();
    casesArray = reversedArray.toString().replaceAll(",", "");
    interaction.message.edit({
      embeds: [
        new MessageEmbed()
          .setAuthor({ name: `${username}'s cases` })
          .setDescription(`${casesArray}`)
          .setColor("RED")
          .setFooter({
            text: `${username} has been punished ${pt} times. • Requested by ${interaction.message.interaction.user.tag} • Page ${casesPage}/${max_pages}`,
          }),
      ],
      components: [
        new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId("CASES_PREVIOUS_PAGE")
            .setLabel(`Previous Page`)
            .setStyle("SUCCESS")
            .setDisabled(disabled1),
          new MessageButton()
            .setCustomId("CASES_NEXT_PAGE")
            .setLabel(`Next Page`)
            .setStyle("SUCCESS")
            .setDisabled(disabled2)
        ),
      ],
    });
  },
};
