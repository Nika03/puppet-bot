const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "punishments",
  description: "Check your own punishments.",
  permission: "SEND_MESSAGES",
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const SettingsModel = require("../../Structures/Schema/Settings.js");
    const is_blacklisted = await SettingsModel.findOne({
      channel: interaction.channel.id,
    });
    if (is_blacklisted !== null) {
      if (!is_blacklisted.commands.includes(`punishments`)) {
        return interaction.reply({
          embeds: [
            new MessageEmbed().setDescription(
              `This command has been disabled in this channel.`
            ),
          ],
          ephemeral: true,
        });
      }
    } else if (!is_blacklisted) {
      return interaction.reply({
        embeds: [
          new MessageEmbed().setDescription(
            `This command has been disabled in this channel.`
          ),
        ],
        ephemeral: true,
      });
    }
    const CaseModel = require("../../Structures/Schema/Cases");
    const f = await CaseModel.find();
    x = 0;
    global.array = [];
    do {
      if (f[x].punished === interaction.user.id) {
        if (f[x].expired === false) {
          if (f[x].type === "warn") {
            global.array.push(f[x].punisher, f[x].reason, f[x].case, f[x].time);
            x++;
          } else {
            x++;
          }
        } else {
          x++;
        }
      } else {
        x++;
      }
    } while (x < f.length);
    if (global.array.length === 4) {
      return interaction.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: `Active Warns` })
            .setDescription(
              `
**Case:** ${global.array[2]}
> Punisher: <@!${global.array[0]}>
> Reason: \`${global.array[1]}\`
> Expires: <t:${global.array[3]}>
                `
            )
            .setFooter({ text: "You should behave better." })
            .setColor("DARK_NAVY"),
        ],
      });
    } else if (global.array.length === 8) {
      return interaction.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: `Active Warns` })
            .setDescription(
              `
**Case:** ${global.array[2]}
> Punisher: <@!${global.array[0]}>
> Reason: \`${global.array[1]}\`
> Expires: <t:${global.array[3]}>

**Case:** ${global.array[6]}
> Punisher: <@!${global.array[4]}>
> Reason: \`${global.array[5]}\`
> Expires: <t:${global.array[7]}>
                `
            )
            .setFooter({ text: "You should behave better." })
            .setColor("DARK_NAVY"),
        ],
      });
    } else if (global.array.length === 12) {
      return interaction.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: `Active Warns` })
            .setDescription(
              `
**Case:** ${global.array[2]}
> Punisher: <@!${global.array[0]}>
> Reason: \`${global.array[1]}\`
> Expires: <t:${global.array[3]}>

**Case:** ${global.array[6]}
> Punisher: <@!${global.array[4]}>
> Reason: \`${global.array[5]}\`
> Expires: <t:${global.array[7]}>

**Case:** ${global.array[10]}
> Punisher: <@!${global.array[8]}>
> Reason: \`${global.array[9]}\`
> Expires: <t:${global.array[11]}>
                `
            )
            .setFooter({ text: "You should behave better." })
            .setColor("DARK_NAVY"),
        ],
      });
    } else if (global.array.length === 16) {
      return interaction.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: `Active Warns` })
            .setDescription(
              `
**Case:** ${global.array[2]}
> Punisher: <@!${global.array[0]}>
> Reason: \`${global.array[1]}\`
> Expires: <t:${global.array[3]}>

**Case:** ${global.array[6]}
> Punisher: <@!${global.array[4]}>
> Reason: \`${global.array[5]}\`
> Expires: <t:${global.array[7]}>

**Case:** ${global.array[10]}
> Punisher: <@!${global.array[8]}>
> Reason: \`${global.array[9]}\`
> Expires: <t:${global.array[11]}>

**Case:** ${global.array[14]}
> Punisher: <@!${global.array[12]}>
> Reason: \`${global.array[13]}\`
> Expires: <t:${global.array[15]}>
                `
            )
            .setFooter({ text: "You should behave better." })
            .setColor("DARK_NAVY"),
        ],
      });
    } else if (global.array.length === 20) {
      return interaction.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: `Active Warns` })
            .setDescription(
              `
**Case:** ${global.array[2]}
> Punisher: <@!${global.array[0]}>
> Reason: \`${global.array[1]}\`
> Expires: <t:${global.array[3]}>

**Case:** ${global.array[6]}
> Punisher: <@!${global.array[4]}>
> Reason: \`${global.array[5]}\`
> Expires: <t:${global.array[7]}>

**Case:** ${global.array[10]}
> Punisher: <@!${global.array[8]}>
> Reason: \`${global.array[9]}\`
> Expires: <t:${global.array[11]}>

**Case:** ${global.array[14]}
> Punisher: <@!${global.array[12]}>
> Reason: \`${global.array[13]}\`
> Expires: <t:${global.array[15]}>

**Case:** ${global.array[18]}
> Punisher: <@!${global.array[16]}>
> Reason: \`${global.array[17]}\`
> Expires: <t:${global.array[19]}>
                `
            )
            .setFooter({ text: "You should behave better." })
            .setColor("DARK_NAVY"),
        ],
      });
    } else {
      return interaction.reply({
        embeds: [
          new MessageEmbed()
            .setColor("DARK_NAVY")
            .setAuthor({ name: "Active Warns" })
            .setDescription("You dont have any active warns!")
            .setFooter({ text: "Keep it that way!" }),
        ],
      });
    }
  },
};
