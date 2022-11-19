const {
  CommandInteraction,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require("discord.js");
const User = require("../../Structures/Schema/User");

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
    console.log("test");
    var find = await User.find().sort({ button_presses: -1 });
    const arrayUser = [];
    const arrayCount = [];
    var counter = 0;
    while (counter !== 10) {
      console.log(counter);
      arrayUser.push(find[counter].user);
      arrayCount.push(find[counter].button_presses);
      counter++;
    }
    const guild = client.guilds.cache.get("946518364216520774");
    const channel = guild.channels.cache.get(interaction.channel.id);
    channel.send({
      embeds: [
        new MessageEmbed()
          .setTitle("Clicks Leaderboard")
          .setDescription(
            `
**These are the top 10 people that have clicked the button!**

> Top 1: <@!${arrayUser[0]}> with **${arrayCount[0]}** clicks!
> Top 2: <@!${arrayUser[1]}> with **${arrayCount[1]}** clicks!
> Top 3: <@!${arrayUser[2]}> with **${arrayCount[2]}** clicks!
> Top 4: <@!${arrayUser[3]}> with **${arrayCount[3]}** clicks!
> Top 5: <@!${arrayUser[4]}> with **${arrayCount[4]}** clicks!
> Top 6: <@!${arrayUser[5]}> with **${arrayCount[5]}** clicks!
> Top 7: <@!${arrayUser[6]}> with **${arrayCount[6]}** clicks!
> Top 8: <@!${arrayUser[7]}> with **${arrayCount[7]}** clicks!
> Top 9: <@!${arrayUser[8]}> with **${arrayCount[8]}** clicks!
> Top 10: <@!${arrayUser[9]}> with **${arrayCount[9]}** clicks!

Updated at: <t:${Math.floor(Date.now() / 1000)}>
      `
          )
          .setColor("BLURPLE"),
      ],
    });
  },
};
