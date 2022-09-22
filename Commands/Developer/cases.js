const {
  CommandInteraction,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require("discord.js");

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
\`Reason for unban:\` ${wc.reason_for_expire}

This user has been unbanned since <t:${wc.time}>.
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
      cases = [];
      pt = 0;
      casesX = 0;
      u.forEach(async (u) => {
        if (u.punished === user.id) {
          if (u.expired === true) {
            isExpired = " • Expired: **true**";
          } else isExpired = "";
          client.casesArray = cases.push(
            `Case **${u.case}** • Type: **${u.type}** ${isExpired}\n`
          );
          pt++;
        }
      });
      casesPage = 1;
      if (cases.length > 10) {
        max_pages = Math.floor(cases.length / 10) + 1;
      } else {
        max_pages = 1;
      }
      checkCaseButtonsFunction = function () {
        if (casesPage === 1) {
          disabled1 = true;
        } else disabled1 = false;
        if (casesPage === max_pages) {
          disabled2 = true;
        } else disabled2 = false;
      };
      loopstop = false;
      unfinishedArray = [];
      do {
        if (casesX === 10 * casesPage) loopstop = true;
        if (!cases[casesX]) loopstop = true;
        if (loopstop === false) {
          unfinishedArray.push(`${cases[casesX]}`);
          casesX++;
        }
      } while (loopstop === false);
      nextPageFunction = function () {
        loopstop = false;
        unfinishedArray = [];
        do {
          if (casesX === 10 * casesPage) loopstop = true;
          if (!cases[casesX]) loopstop = true;
          if (loopstop === false) {
            unfinishedArray.push(`${cases[casesX]}`);
            casesX++;
          }
        } while (loopstop === false);
      };
      previousPageFunction = function () {
        casesxcount = 0;
        casesX = casesX - 10;
        loopstop = false;
        unfinishedArray = [];
        do {
          console.log(casesX, casesxcount);
          if (casesxcount === 10) loopstop = true;
          if (!cases[casesX]) loopstop = true;
          if (loopstop === false) {
            casesX--;
            unfinishedArray.push(`${cases[casesX]}`);
            casesxcount++;
          }
        } while (loopstop === false);
      };
      casesArray = unfinishedArray.toString().replaceAll(",", "");
      checkCaseButtonsFunction();
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: `${user.username}'s cases` })
            .setDescription(`${casesArray}`)
            .setColor("RED")
            .setFooter({
              text: `${user.username} has been punished ${pt} times. • Requested by ${interaction.user.tag} • Page ${casesPage}/${max_pages}`,
            }),
        ],
        components: [
          new MessageActionRow().addComponents(
            new MessageButton()
              .setCustomId("CASES_PREVIOUS_PAGE")
              .setLabel(`Previous Page`)
              .setStyle("SUCCESS")
              .setDisabled(disabled1),
            new MessageButton()
              .setCustomId("CASES_NEXT_PAGE")
              .setLabel(`Next Page`)
              .setStyle("SUCCESS")
              .setDisabled(disabled2)
          ),
        ],
      });
      caseVariables = function () {
        username = user.username;
      };
    }
  },
};
