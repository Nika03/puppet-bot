const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  id: "yes",
  permission: "SEND_MESSAGES",
  async execute(interaction, client) {
    if (
      interaction.user.id !==
      userConfirmationArray[interaction.message.reference.messageId][0]
    )
      return;
    console.log("correct user!");
    //if (interaction.message.interaction.user.id !== interaction.user.id)
    //  return interaction.deferUpdate();
    //interaction.message.edit({
    //  content:
    //    "Item has been added to crafting queue! You can check the queue with `/forge`.",
    //});
  },
};
