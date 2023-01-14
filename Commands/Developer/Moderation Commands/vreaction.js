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
    const guild = client.guilds.cache.get("946518364216520774");
    const rc = await Math.floor(Math.random() * 5);
    if (rc === 0) client.color = "🟥";
    if (rc === 1) client.color = "🟩";
    if (rc === 2) client.color = "🟦";
    if (rc === 3) client.color = "🟫";
    if (rc === 4) client.color = "🟧";
    if (rc === 5) client.color = "🟪";
    const channel = guild.channels.cache.get("946528426687336559");
    channel.messages.fetch("1008858316509806644").then((m) => {
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
            `The reaction for verification has been succesfully changed. You can see it in <#946528426687336559>`
          )
          .setColor("WHITE"),
      ],
      ephemeral: true,
    });
  },
};
