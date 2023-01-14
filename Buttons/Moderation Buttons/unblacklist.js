const { MessageActionRow, MessageButton, UserFlags } = require("discord.js");
const BlacklistModel = require("../../Structures/Schema/Blacklist");
module.exports = {
  id: "unblacklist",
  permission: "SEND_MESSAGES",

  async execute(interaction, client) {
    interaction.message.edit({
      components: [
        new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId("unblacklist")
            .setLabel("Unblacklist")
            .setStyle("DANGER")
            .setDisabled(true)
        ),
      ],
    });
    const user = interaction.message.mentions.members.first();
    interaction.reply(
      `${user.user} has been unblacklisted. They can now verify and talk.`
    );
    await BlacklistModel.deleteOne({ user: user.user.id });
  },
};
