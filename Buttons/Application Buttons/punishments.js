const {
  Modal,
  TextInputComponent,
  MessageActionRow,
  MessageEmbed,
} = require("discord.js");
const CasesModel = require("../../Structures/Schema/Cases");

module.exports = {
  id: "punishments",
  permission: "SEND_MESSAGES",
  async execute(interaction, client) {
    const users = await CasesModel.find();
    var counter = 0;
    users.forEach((c) => {
      if (
        c.punished == interaction.user.id &&
        c.type == "warn" &&
        c.expired == false
      ) {
        counter++;
      }
    });
    if (counter == 0) {
      var description = `You have **0** active warnings.`;
    } else if (counter == 1) {
      var description = `You have **1** active warning.`;
    } else {
      var description = `You have **${counter}** active warnings.`;
    }
    interaction.reply({
      embeds: [
        new MessageEmbed()
          .setDescription(description)
          .setAuthor({ name: "Active Warnings" })
          .setColor(interaction.guild.me.displayHexColor || "DARK_RED")
          .setTimestamp()
          .setFooter({ text: "Requested at" }),
      ],
      ephemeral: true,
    });
  },
};
