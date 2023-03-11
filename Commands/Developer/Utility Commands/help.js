const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description: "Shows the list of commands and how to use them.",
  permission: "SEND_MESSAGES",
  usage: "`/help, /help [command]`",
  type: "Utility",
  options: [
    {
      name: "command",
      description: "View information on a certain command.",
      type: "STRING",
      required: false,
    },
  ],
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (interaction.toString() === "/help") {
      utilityArray = [];
      funArray = [];
      moderationArray = [];
      economyArray = [];
      otherArray = [];
      client.commands.map(async (c) => {
        if (c.type === "Utility") {
          utilityArray.push(`\`${c.name}\``);
        } else if (c.type === "Fun") {
          funArray.push(`\`${c.name}\``);
        } else if (c.type === "Moderation") {
          moderationArray.push(`\`${c.name}\``);
        } else if (c.type === "Economy") {
          economyArray.push(`\`${c.name}\``);
        } else if (c.type === "Other") {
          otherArray.push(`\`${c.name}\``);
        }
      });
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setDescription(
              `**Welcome to the help command. You can view more information on the commands with /help [command].**

Utility Commands:
${utilityArray.toString().replaceAll(",", ", ")}

Fun Commands:
${funArray.toString().replaceAll(",", ", ")}

Moderation Commands:
${moderationArray.toString().replaceAll(",", ", ")}

Economy Commands:
${economyArray.toString().replaceAll(",", ", ")}

Other Commands:
${otherArray.toString().replaceAll(",", ", ")}
`
            )
            .setColor(interaction.guild.me.displayHexColor || "DARK_NAVY")
            .setFooter({ text: `Requested by ${interaction.user.tag}` })
            .setTimestamp(),
        ],
      });
    } else {
      embedMessage = false;
      const option = interaction.options.getString("command");
      client.commands.map(async (c) => {
        if (c.name === option) {
          embedMessage = `
Information on the command \`${option}\`:

Name: **${c.name}**
Type: ${c.type}
Description: \`${c.description}\` 
Usage: ${c.usage}
Permissions: ${c.permission}
`;
        }
      });
      if (!embedMessage) {
        return interaction.reply({
          content: `There is no command with the name \`${option}\`.`,
          ephemeral: true,
        });
      } else {
        interaction.reply({
          embeds: [
            new MessageEmbed()
              .setDescription(`${embedMessage.toString()}`)
              .setColor(interaction.guild.me.displayHexColor || "DARK_NAVY")
              .setFooter({ text: `Requested by ${interaction.user.tag}` })
              .setTimestamp(),
          ],
        });
      }
    }
  },
};
