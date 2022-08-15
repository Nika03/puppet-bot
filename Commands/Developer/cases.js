const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "cases",
  description: "Check a certain case or view the cases of an user.",
  permission: "SEND_MESSAGES",
  options: [
    {
      name: "view",
      description: "View a certain case or someone's case",
      type: "SUB_COMMAND",
      options: [
        {
          name: "case",
          description: "The case you want to view.",
          type: "NUMBER",
        },
        {
          name: "user",
          description: "Check the user's warnings.",
          type: "USER",
        },
      ],
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
    if (member !== undefined) {
      if (!member.roles.cache.has(staff)) {
        return interaction.reply({
          content: `You cannot use this command!`,
          ephemeral: true,
        });
      }
    }

    const CasesModel = require("../../Structures/Schema/Cases");

    if (interaction.toString().includes(`/cases view case:`)) {
      const c = interaction.options.getNumber("case");
      const wc = await CasesModel.findOne({ case: c });

      if (!wc)
        return interaction.reply({
          content: `Case ${c} is not a valid case!`,
          ephemeral: true,
        });

      const punished = wc.punished;
      const punisher = wc.punisher;
      const type = wc.type;
      const expired = wc.expired;
      const pardoner = wc.pardoner;
      if (!wc.reason) {
        client.reason = "**reason not set**.";
      } else {
        client.reason = `${wc.reason}.`;
      }
      if (wc.expired === true) {
        if (!wc.staff_who_expired) {
          client.o = "Automaticly expired after 14 days.";
        } else {
          client.o = `\`Staff who expired:\` <@!${wc.staff_who_expired}> *(${wc.staff_who_expired})*
\`Reason:\` ${wc.reason_for_expire}.
                `;
        }
      } else {
        if (!wc.time) {
          r = "Expires: **never**";
        } else {
          r = `Expires: <t:${wc.time}>`;
        }
        client.o = `${r}`;
      }
      if (wc.type === `unban`) {
        client.embed = `
> __Type:__ **${type}**                         
\`Member Unbanned:\` <@!${punished}> (${punished})
\`Staff who unbanned:\` <@!${pardoner}> (${pardoner})
`;
      } else {
        client.embed = `
> __Type:__ **${type}**                         
\`Punished:\` <@!${punished}> *(${punished})*
\`Punisher:\` <@!${punisher}> *(${punisher})*
\`Reason:\` ${client.reason}

> __Expired:__ **${expired}**
${client.o}
`;
      }
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: `Case ${c}` })
            .setDescription(`${client.embed}`)
            .setColor("RED")
            .setFooter({ text: `Requested by: ${interaction.user.tag}` })
            .setTimestamp(),
        ],
      });
    } else if (interaction.toString().includes("/cases view user:")) {
      const CasesModel = require("../../Structures/Schema/Cases");
      const user = interaction.options.getUser("user");
      const u = await CasesModel.find().sort("-cases");
      client.r = 0;
      const uc = u.map((c) => {
        if (c.punished === user.id) {
          if (c.type === `warn`) {
            client.exp = `• Expired: **${c.expired}**`;
          } else {
            client.exp = ``;
          }
          client.r++;
          return `Case **${c.case}** • Type: **${c.type}** ${client.exp}
`;
        }
      });
      if (client.r === 0) {
        client.desc = `${user.username} has not been punished yet.`;
      } else {
        client.desc = uc.reverse().toString().replaceAll(",", "");
      }
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: `${user.username}'s cases` })
            .setDescription(`${client.desc}`)
            .setColor("RED")
            .setFooter({
              text: `${user.username} has been punished ${client.r} times. • Requested by ${interaction.user.tag}`,
            }),
        ],
      });
    }
  },
};
