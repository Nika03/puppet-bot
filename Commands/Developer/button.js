const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "button",
  description: "button",
  permission: "ADMINISTRATOR",

  execute(interaction) {
    const row = new MessageActionRow();
    row.addComponents(
      new MessageButton()
        .setCustomId("Button")
        .setLabel("button")
        .setStyle("SUCCESS")
    );

    interaction.reply({ content: "this is a button", components: [row] });
  },
};
