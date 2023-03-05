const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "vreaction",
  description: "Change the verification reaction.",
  permission: "MANAGE_MESSAGES",
  type: "Other",
  usage: "`/vreaction`",
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const guild = client.guilds.cache.get("946518364216520774"); // puppet server
    const channel = guild.channels.cache.get("946528426687336559"); // verify-here
	//const guild = client.guilds.cache.get("752104036102176778"); // nika server
    //const channel = guild.channels.cache.get("1072243970261921792"); // static
    const rc = await Math.floor(Math.random() * 5);
    if (rc === 0) client.color = "🟥";
    if (rc === 1) client.color = "🟩";
    if (rc === 2) client.color = "🟦";
    if (rc === 3) client.color = "🟫";
    if (rc === 4) client.color = "🟧";
    if (rc === 5) client.color = "🟪";
    channel.messages.fetch("1082004543870599229").then((m) => { // msg id verify-here puppets
      try {
        m.edit({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: "Verification" })
              .setDescription(
                `
  Hello! Welcome to **Neco Puppeteers' Cult.** 
  
  > In order to verify, you need to press the ${client.color} reaction. Failing to do this will get you timed out for 5 minutes.
  
  > **Having problems?**
  Open a ticket in <#946523109924696074>! The staff members will assist you further.
  
  Remember, have fun in the server!
            `
              )
              .setColor("DARK_RED")
              .setTimestamp(),
          ],
        });
      } catch (e) {
        console.log(e);
      }
    });
    interaction.reply({
      embeds: [
        new MessageEmbed()
          .setDescription(
            `The reaction for verification has been succesfully changed. You can see it in <#${channel}>`
          )
          .setColor("WHITE"),
      ],
      ephemeral: true,
    });
  },
};
