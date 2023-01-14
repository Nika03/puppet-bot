const {
  CommandInteraction,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require("discord.js");

module.exports = {
  name: "send",
  description: "Send a programmed message to a certain channel.",
  permission: "ADMINISTRATOR",
  type: "Forbidden",
  usage: "`/send`",
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (interaction.user.id !== "452436342841016341") return;
    interaction.reply({ content: "Sent!", ephemeral: true });
    interaction.channel.send({
      embeds: [
        new MessageEmbed()
          .setAuthor({ name: "Moderator Applications" })
          .setDescription(
            `Hello! If you can see this channel, it means you have level 5, but it doesnt mean you can apply. Here are the requirements that you need to follow in order to apply for a position as a staff member:

> You need to have **less than 3 active warnings** in order to apply. (Click on the "Check Punishments" button to check your punishments.)
> You need to be atleast **15 years old**.
> Once you submit your application, you cannot submit another one.
> Have 2FA activated.

Now, if you meet all requirements, start the application by clicking the "Application - User Questions" button!
            `
          )
          .setColor("DARK_AQUA"),
      ],
      components: [
        new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId("punishments")
            .setLabel("Check Punishments")
            .setStyle("SECONDARY"),
          new MessageButton()
            .setCustomId("appuq")
            .setLabel("Application - User Questions")
            .setStyle("SUCCESS"),
          new MessageButton()
            .setCustomId("appmq")
            .setLabel("Application - Moderating Questions")
            .setStyle("SUCCESS")
        ),
      ],
    });
  },
};
