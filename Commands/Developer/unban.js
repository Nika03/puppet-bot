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
    //Change this
    //const g = `986357448925401168` //Test server
    //const staff = `986600882810544138` //Test server staff role
    const g = `946518364216520774`; //Neco server
    const staff = `970229987405877259`; //Neco server staff role

    const user = interaction.options.getString("user");
    const reason = interaction.options.getString("reason");
    const guild = client.guilds.cache.get(g);
    try {
      await guild.members.unban(user);
    } catch (e) {
      const err = e.toString();
      client.r = true;
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
      if (!client.r) {
        interaction.reply({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: "User Unbanned" })
              .setDescription(
                `<@!${user}> (${user}) has been unbanned. They can now join the server.`
              )
              .setColor("DARK_GREEN")
              .setFooter({ text: `Requested by ${interaction.user.tag}` })
              .setTimestamp(),
          ],
        });
        const ch = "1009968902941442119";
        const logs = guild.channels.cache.get(ch);
        logs.send({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: `User Unbanned` })
              .setColor("DARK_GOLD")
              .setDescription(
                `<@!${user}> (${user}) has been unbanned by ${interaction.user}.`
              )
              .setTimestamp(),
          ],
        });
        const CasesModel = require("../../Structures/Schema/Cases");
        const RestartsModel = require("../../Structures/Schema/Restarts");
        const UMM = require("../../Structures/Schema/UserModeration");
        const r = await RestartsModel.findOne({ owner: "Darkeew" });
        const u = await CasesModel.findOne({ punished: user });
        if (u) {
          await CasesModel.findOneAndUpdate(
            { punished: user },
            { expired: true },
            { reason_for_expire: `${reason}` },
            { staff_who_expired: `${interaction.user.id}` }
          );
          await CasesModel.create({
            punished: user,
            type: "unban",
            pardoner: interaction.user.id,
            case: r.cases,
          });
          r.cases++;
          await r.save();
          await UMM.findOneAndUpdate({ user: user }, { warns: 0 });
        }
      }
    }
  },
};
