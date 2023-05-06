const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (interaction.isCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command)
        return (
          interaction.reply({
            embeds: [
              new MessageEmbed()
                .setColor("RED")
                .setDescription(
                  "An error occurred while running this command."
                ),
            ],
          }) && client.commands.delete(interaction.commandName)
        );
      if (interaction.member.user.id === "453944662093332490") {
        return await command.execute(interaction, client);
      } else if (
        command.permission &&
        !interaction.member.permissions.has(command.permission)
      ) {
        return interaction.reply({
          content: `You do not have the required permission for this command: \`${interaction.commandName}\`.`,
          ephemeral: true,
        });
      }
      try {
        await command.execute(interaction, client);
        const channel = client.channels.cache.get("1009968902941442119"); // teto-log puppets
        channel.send({
          embeds: [
            new MessageEmbed()
              .setAuthor({
                name: `Command Logging`,
              })
              .setDescription(
                `
${interaction.user} (${interaction.user.id}, ${
                  interaction.user.username
                }) has ran a command:

> Channel:
${interaction.channel} (${interaction.channel.id})

> Command: 
Name: ${interaction.commandName} 
Command ID: ${interaction.commandId}

> Timestamp:
<t:${Math.floor(Date.now() / 1000)}> (${Math.floor(Date.now() / 1000)})
            `
              )
              .setColor("AQUA"),
          ],
        });
      } catch (e) {
        console.log(e);
        const channel = client.channels.cache.get("1009968902941442119"); // teto-log puppets
        channel.send({
          content: "<@!453944662093332490>, <@!468754136524128256>",
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: "Something went wrong." })
              .setDescription(
                `Failed to execute ${
                  interaction.commandName
                } at <t:${Math.floor(Date.now() / 1000)}>
Channel: ${interaction.channel}
User: ${interaction.user.username} (${interaction.user}, ${interaction.user.id})
${e.toString()}`
              )
              .setColor("AQUA"),
          ],
        });
      }
    }
  },
};
