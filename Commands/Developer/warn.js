const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "warn",
  description: "Warn an user that has behaved badly.",
  permission: "MANAGE_MESSAGES",
  type: "Moderation",
  usage: "`/warn [user] [reason]`",
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

    const guild = client.guilds.cache.get("946518364216520774");
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

    const UserModeration = require("../../Structures/Schema/UserModeration");
    userWarns = await UserModeration.findOne({ user: user.id });
    if (!userWarns) {
      await UserModeration.create({ user: user.id, warns: 0 });
    }
    userWarns = await UserModeration.findOne({ user: user.id });

    interaction.reply({
      embeds: [
        new MessageEmbed()
          .setAuthor({ name: `Case ${tc.cases}` })
          .setColor("DARK_GOLD")
          .setDescription(`${user} has been warned for: \`${reason}\``)
          .setFooter({
            text: `They now have ${userWarns.warns + 1} active warnings.`,
          })
          .setTimestamp(),
      ],
    });
    const logs = guild.channels.cache.get("1009968902941442119");
    logs.send({
      content: `${user.id}`,
      embeds: [
        new MessageEmbed()
          .setAuthor({ name: `Case ${tc.cases}` })
          .setColor("DARK_GOLD")
          .setDescription(
            `\`${user.tag}\` has been warned for: \`${reason}\`. This was done by ${interaction.user}.`
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
You have been warned in **Neco Puppeteers' Cult**
Punisher: ${interaction.user} *(${interaction.user.id})*
Reason: \`${reason}\`
This warning will expire <t:${Math.floor(Date.now() / 1000) + 1209600}>.
`
            )
            .setColor("DARK_RED")
            .setFooter({
              text: "You can check your active warnings with /punishments.",
            }),
        ],
      });
    } catch (e) {
      console.log(e);
    }
    tc.cases++;
    await tc.save();
    userCurrentWarns = 0;
    const allCases = await CasesModel.find();
    allCases.forEach((c) => {
      if (c.type == "warn" && c.expired == true && c.punished == user.id) {
        userCurrentWarns++;
      }
    });
    await UserModeration.findOneAndUpdate(
      { user: user.id },
      { warns: userCurrentWarns }
    );
    if (userCurrentWarns === 2) {
      try {
        await member.timeout(900 * 1000, "Timed out for reaching 2 warns");
        channel.send({
          embeds: [
            new MessageEmbed()
              .setDescription(
                `${user} has been muted for **15 minutes.** Reason:\`reaching 2 warns\`.`
              )
              .setColor("DARK_GOLD"),
          ],
        });
      } catch (e) {
        return channel.send(`${e.toString()}`);
      }
    } else if (userCurrentWarns === 3) {
      try {
        await member.timeout(3600 * 1000, "Timed out for reaching 3 warns");
        channel.send({
          embeds: [
            new MessageEmbed()
              .setDescription(
                `${user} has been muted for **1 hour.** Reason:\`reaching 3 warns\`.`
              )
              .setColor("DARK_GOLD"),
          ],
        });
      } catch (e) {
        return channel.send(`${e.toString()}`);
      }
    } else if (userCurrentWarns === 4) {
      try {
        await member.timeout(43200 * 1000, "Timed out for reaching 4 warns");
        channel.send({
          embeds: [
            new MessageEmbed()
              .setDescription(
                `${user} has been muted for **12 hours.** Reason:\`reaching 4 warns\`.`
              )
              .setColor("DARK_GOLD"),
          ],
        });
      } catch (e) {
        return channel.send(`${e.toString()}`);
      }
    }
  },
};
