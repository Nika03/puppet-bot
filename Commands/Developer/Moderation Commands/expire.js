const { CommandInteraction, MessageEmbed } = require("discord.js");
const CasesModel = require("../../Structures/Schema/Cases");
const UserModeration = require("../../Structures/Schema/UserModeration");

module.exports = {
  name: "expire",
  description: "Expire a warning.",
  permission: "MANAGE_MESSAGES",
  type: "Moderation",
  usage: "`/expire [case] [reason]`",
  options: [
    {
      name: "case",
      description: "The case to expire.",
      type: "NUMBER",
      required: true,
    },
    {
      name: "reason",
      description: "The reason why the case was expired.",
      type: "STRING",
      required: true,
    },
  ],
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const caseNumber = interaction.options.getNumber("case");
    const reason = interaction.options.getString("reason");

    const guild = client.guilds.cache.get("946518364216520774");
    const member = guild.members.cache.get(interaction.user.id);
    if (
      !member.roles.cache.has("993410506926850068") &&
      !member.roles.cache.has("946525953033646130")
    ) {
      return interaction.reply({
        content:
          "You are not able to use this command. If you want to expire a warning, ask a <@&993410506926850068> or a higher role.",
        ephemeral: true,
      });
    }
    var findCase = await CasesModel.findOne({ case: caseNumber });
    if (!findCase) {
      return interaction.reply({
        content: `Case \`${caseNumber}\` does not exist.`,
        ephemeral: true,
      });
    }
    if (findCase.type !== "warn") {
      return interaction.reply({
        content: "You cannot expire cases that are not warns.",
        ephemeral: true,
      });
    }
    if (findCase.type === "warn" && findCase.expired === true) {
      return interaction.reply({
        content: `Case \`${caseNumber}\` is already expired.`,
      });
    }

    interaction.reply({
      embeds: [
        new MessageEmbed()
          .setAuthor({ name: `Case Expired` })
          .setDescription(
            `Case **${caseNumber}** has been expired. 
> Reason: \`${reason}\``
          )
          .setColor("DARK_NAVY")
          .setFooter({ text: `Requested by ${interaction.user.tag}` })
          .setTimestamp(),
      ],
    });
    const logs = guild.channels.cache.get("1009968902941442119");
    logs.send({
      embeds: [
        new MessageEmbed()
          .setAuthor({ name: `Case Expired` })
          .setDescription(
            `Case **${caseNumber}** has been expired. 
> The user warned is <@!${findCase.punished}> \`(${findCase.punished})\`
> The staff that expired is ${interaction.user} \`(${interaction.user.id})\` 
> Reason for expire: \`${reason}\``
          )
          .setColor("DARK_GOLD")
          .setFooter({ text: `Requested by ${interaction.user.tag}` })
          .setTimestamp(),
      ],
    });
    await CasesModel.findOneAndUpdate(
      { case: caseNumber },
      {
        expired: true,
        staff_who_expired: interaction.user.id,
        reason_for_expire: reason,
      }
    );

    userCurrentWarns = 0;
    const allCases = await CasesModel.find();
    allCases.forEach((c) => {
      if (
        c.type == "warn" &&
        c.expired == false &&
        c.punished == findCase.punished
      ) {
        userCurrentWarns++;
      }
    });
    await UserModeration.findOneAndUpdate(
      { user: findCase.punished },
      { warns: userCurrentWarns }
    );

    var userWarned = guild.members.cache.get(findCase.punished);
    try {
      userWarned.send({
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: "Case Expired" })
            .setDescription(
              `**Case ${findCase.case}** has been expired. Be more careful next time and read the rules!
> Reason of the punishment: \`${findCase.reason}\`
> Punisher: <@!${findCase.punisher}> \`(${findCase.punisher})\`

> Reason for expire: \`${reason}\`.
> Staff that expired: ${interaction.user} \`(${interaction.user.id})\`
                `
            )
            .setColor("DARK_AQUA")
            .setFooter({
              text: "Be careful next time! Check your active warns with '/punishments'",
            }),
        ],
      });
    } catch (e) {
      console.log(e.toString());
    }
  },
};
