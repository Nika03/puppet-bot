const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "warn",
  description: "Warn an user that has behaved badly.",
  permission: "MANAGE_MESSAGES",
  options: [
    {
      name: `user`,
      description: `The user to warn`,
      required: true,
      type: `USER`,
    },
    {
      name: `reason`,
      description: "The reason for the warn.",
      required: true,
      type: `STRING`,
    },
  ],
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason");

    //const g = `986357448925401168` //Test server
    const g = `946518364216520774`; //Neco server

    const guild = client.guilds.cache.get(g);
    const member = guild.members.cache.get(user.id);
    const channel = guild.channels.cache.get(interaction.channel.id);
    if (!member) {
      return interaction.reply({
        content: "You cannot warn someone that isnt in the server!",
        ephemeral: true,
      });
    }

    if (user === interaction.user.id) {
      return interaction.reply({
        content: "You cannot warn yourself!",
        ephemeral: true,
      });
    }

    const RestartsModel = require("../../Structures/Schema/Restarts");
    const CasesModel = require("../../Structures/Schema/Cases");

    const find_cases = await RestartsModel.findOne();
    if (!find_cases.cases) {
      await RestartsModel.updateOne({}, { cases: 1 });
    }
    const tc = await RestartsModel.findOne();

    interaction.reply({
      embeds: [
        new MessageEmbed()
          .setAuthor({ name: `Case ${tc.cases}` })
          .setColor("DARK_GOLD")
          .setDescription(`${user} has been warned for: \`${reason}\`.`)
          .setFooter({ text: `You can check your warns with /punishments` })
          .setTimestamp(),
      ],
    });
    const ch = "1009968902941442119";
    const logs = guild.channels.cache.get(ch);
    logs.send({
      embeds: [
        new MessageEmbed()
          .setAuthor({ name: `User Warned` })
          .setColor("DARK_GOLD")
          .setDescription(
            `${user} has been warned for: \`${reason}\`. This was done by ${interaction.user}.`
          )
          .setTimestamp(),
      ],
    });

    await CasesModel.create({
      punished: user.id,
      punisher: interaction.user.id,
      time: Math.floor(Date.now() / 1000) + 1209600,
      type: "warn",
      expired: false,
      case: tc.cases,
      reason: reason,
    });
    try {
      await member.send({
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: "Teto Trader" })
            .setDescription(
              `
You have been warned in Puppet's Neco Cult
Punisher: ${interaction.user} *(${interaction.user.id})*
Reason: ${reason}
This warning will expire ${Math.floor(Date.now() / 1000) + 1209600}.
`
            )
            .setColor("DARK_RED")
            .setFooter({
              text: "You can check your active warnings with /punishments",
            }),
        ],
      });
    } catch (e) {
      console.log(e);
    }
    tc.cases++;
    await tc.save();
    const UMM = require("../../Structures/Schema/UserModeration");
    const ummc = await UMM.findOne({ user: user.id });
    if (!ummc) {
      await UMM.create({ user: user.id });
    }
    const uwc = await UMM.findOne({ user: user.id });
    if (!uwc.warns) {
      await UMM.findOneAndUpdate({ user: user.id }, { warns: 1 });
    } else {
      const nw = uwc.warns + 1;
      await UMM.findOneAndUpdate({ user: user.id }, { warns: nw });
    }
    const cfw = await UMM.findOne({ user: user.id });
    if (cfw.warns === 2) {
      try {
        await member.timeout(900 * 1000, "Timed out for reaching 2 warns");
      } catch (e) {
        client.r = true;
        return channel.send(`${e.toString()}`);
      } finally {
        if (!client.r) {
          channel.send({
            embeds: [
              new MessageEmbed()
                .setDescription(
                  `${user} has been muted for **15 minutes.** Reason:\`reaching 2 warns\`.`
                )
                .setColor("DARK_GOLD"),
            ],
          });
        }
      }
    } else if (cfw.warns === 3) {
      try {
        await member.timeout(3600 * 1000, "Timed out for reaching 3 warns");
      } catch (e) {
        client.r = true;
        return channel.send(`${e.toString()}`);
      } finally {
        if (!client.r) {
          channel.send({
            embeds: [
              new MessageEmbed()
                .setDescription(
                  `${user} has been muted for **1 hour.** Reason:\`reaching 3 warns\`.`
                )
                .setColor("DARK_GOLD"),
            ],
          });
        }
      }
    } else if (cfw.warns === 4) {
      try {
        await member.timeout(43200 * 1000, "Timed out for reaching 4 warns");
      } catch (e) {
        client.r = true;
        return channel.send(`${e.toString()}`);
      } finally {
        if (!client.r) {
          channel.send({
            embeds: [
              new MessageEmbed()
                .setDescription(
                  `${user} has been muted for **12 hours.** Reason:\`reaching 4 warns\`.`
                )
                .setColor("DARK_GOLD"),
            ],
          });
        }
      }
    }
  },
};
