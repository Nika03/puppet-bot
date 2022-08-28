const { CommandInteraction, MessageEmbed, Guild } = require("discord.js");

module.exports = {
  name: "unban",
  description: "Unban an user that has been banned before.",
  permission: "BAN_MEMBERS",
  options: [
    {
      name: `user`,
      description: `The user to unban.`,
      type: `STRING`,
      required: true,
    },
    {
      name: `reason`,
      description: `The reason for the unban.`,
      type: `STRING`,
      required: true,
    },
  ],
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const user = interaction.options.getString("user");
    const reason = interaction.options.getString("reason");
    const guild = client.guilds.cache.get(interaction.guild.id);

    const CasesModel = require("../../Structures/Schema/Cases");
    const UMM = require("../../Structures/Schema/UserModeration");
    const RestartsModel = require("../../Structures/Schema/Restarts");
    const c = await RestartsModel.findOne();

    try {
      await guild.members.unban(user);
    } catch (e) {
      client.woopsie = true;
      const err = e.toString();
      if (err === "DiscordAPIError: Unknown User") {
        return interaction.reply({
          content: "I could not unban that user since it does not exist.",
          ephemeral: true,
        });
      } else if (err.includes("DiscordAPIError: Invalid Form Body")) {
        return interaction.reply({
          content: `\`${user}\` is not a valid ID and contains letters.`,
          ephemeral: true,
        });
      } else if (err.includes("DiscordAPIError: Unknown Ban")) {
        return interaction.reply({
          content: "That user is not banned!",
          ephemeral: true,
        });
      }
    } finally {
      if (!client.woopsie) {
        interaction.reply({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: `Case ${c.cases}` })
              .setDescription(
                `<@!${user}> (${user}) has been unbanned with reason: \`${reason}\`. They can now join the server.`
              )
              .setColor("DARK_GREEN")
              .setFooter({ text: `Requested by ${interaction.user.tag}` })
              .setTimestamp(),
          ],
        });
      }
      const bancase = await CasesModel.findOne({
        punished: user,
        type: "ban",
        expired: false,
      });
      if (bancase) {
        await CasesModel.findOneAndUpdate(
          { punished: `${user}` },
          {
            expired: true,
          }
        );
        await CasesModel.create({
          type: "unban",
          punished: user,
          case: c.cases,
          pardoner: interaction.user.id,
          reason_for_expire: reason,
          time: Math.floor(Date.now() / 1000),
        });
        c.cases++;
        await c.save();
        await UMM.findOneAndUpdate({ user: user }, { warns: 0 });
      }
      const ch = "1009968902941442119";
      const logs = guild.channels.cache.get(ch);
      logs.send({
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: `User Unbanned` })
            .setColor("DARK_GOLD")
            .setDescription(
              `<@!${user}> (${user}) has been unbanned by <@!${interaction.user.id}> with reason: ${reason}. The case for the user's ban is case ${bancase.case}.`
            )
            .setTimestamp(),
        ],
      });
    }
  },
};
