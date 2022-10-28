const { CommandInteraction, MessageEmbed } = require("discord.js");

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
    //Change this

    //const g = `986357448925401168` //Test server
    //const staff = `986600882810544138` //Test server staff role
    const g = `946518364216520774`; //Neco server
    const staff = `970229987405877259`; //Neco server staff role

    //Change this

    const guild = client.guilds.cache.get(g);
    const member = guild.members.cache.get(interaction.user.id);
    const channel = guild.channels.cache.get("946523493061767268");
    if (member !== undefined) {
      if (!member.roles.cache.has(staff)) {
        return interaction.reply({
          content: `You cannot use this command!`,
          ephemeral: true,
        });
      }
    }
    const CaseModel = require("../../Structures/Schema/Cases");
    const cn = interaction.options.getNumber("case");
    const reason = interaction.options.getString("reason");
    const c = await CaseModel.findOne({ case: cn });
    if (!c)
      return interaction.reply({
        content: `Case ${cn} does not exist. Please check if thats the case you want to expire.`,
        ephemeral: true,
      });
    if (c.type === "warn") {
      if (c.expired === true) {
        return interaction.reply({
          content: `Case ${cn} has already been expired. Please check if thats the case you want to expire.`,
          ephemeral: true,
        });
      }
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: "Case Expired" })
            .setDescription(
              `**Case ${c.case}** has been expired.
> Reason: \`${reason}\`.
`
            )
            .setColor("DARK_GOLD"),
        ],
      });
      const ch = "1009968902941442119";
      const logs = guild.channels.cache.get(ch);
      logs.send({
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: `Case Expire` })
            .setColor("DARK_GOLD")
            .setDescription(
              `Case **${c.case}** has been expired by ${interaction.user}. The reason for the expire is: \`${reason}\`.`
            )
            .setTimestamp(),
        ],
      });
      await CaseModel.findOneAndUpdate(
        { case: cn },
        {
          expired: true,
          staff_who_expired: interaction.user.id,
          reason_for_expire: reason,
        }
      );
      const punished = guild.members.cache.get(c.punished);
      const UMM = require("../../Structures/Schema/UserModeration");
      const rm = await UMM.findOne({ user: c.punished });
      if (rm.warns === 0) {
        client.nw = 0;
        channel.send({
          content: "An error has occured, <@!452436342841016341>",
        });
      } else {
        client.nw = rm.warns - 1;
      }
      await UMM.findOneAndUpdate({ user: c.punished }, { warns: client.nw });
      try {
        punished
          .send({
            embeds: [
              new MessageEmbed()
                .setAuthor({ name: "Case Expired" })
                .setDescription(
                  `**Case ${c.case}** has been expired. Be more careful next time and read the rules!
> Reason of the punishment: \`${c.reason}\`
> Punisher: <@!${c.punisher}> (${c.punisher})

> Reason for expire: \`${reason}\`.
> Staff that expired: ${interaction.user} (${interaction.user.id})
                `
                )
                .setColor("DARK_GOLD"),
            ],
          })
          .catch((e) => {
            throw e;
          });
      } catch (e) {
        console.log(e);
      }
    } else {
      return interaction.reply({
        content:
          "You can only expire cases that are warnings! If you wish to expire another type, use `/unmute` or `/unban`.",
        ephemeral: true,
      });
    }
  },
};
