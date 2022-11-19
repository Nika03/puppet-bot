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
    const guild = client.guilds.cache.get("946518364216520774");
    const channel = guild.channels.cache.get(interaction.channel.id);
    channel.send({
      embeds: [
        new MessageEmbed()
          .setTitle("Press The Button!")
          .setDescription(
            `
      Its simple, press the button, and the counter will go up!

      > __Counter:__ \`0 clicks\`
      
      Current Main Goal: \`150'000 clicks\`
      > Prize: \`Nitro Regular\`

      Current Subgoal: \`5'000 clicks\`
      > Prize: \`Top 10 will get a custom role giveaway.\`

      Last Updated at: <t:${Math.floor(Date.now() / 1000)}:R>
      *If the button isnt working, please DM <@!452436342841016341>. The counter will update each minute.*
      `
          )
          .setColor("DARK_RED"),
      ],
      components: [
        new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId("press-the-button")
            .setLabel("Click Me!")
            .setStyle("DANGER")
        ),
      ],
    });
  },
};
