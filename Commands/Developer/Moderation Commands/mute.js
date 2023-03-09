const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "mute",
  description: "Mute an user that has been behaving badly.",
  permission: "MANAGE_MESSAGES",
  type: "Moderation",
  usage: "`/mute [user] [time] [reason]`",
  options: [
    {
      name: "user",
      description: "The user to mute.",
      type: "USER",
      required: true,
    },
    {
      name: "time",
      description: "How long the user will stay muted.",
      type: "STRING",
      required: true,
    },
    {
      name: "reason",
      description: "The reason why the user got muted.",
      type: "STRING",
      required: true,
    },
  ],
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const user = interaction.options.getUser("user");
    const time = interaction.options.getString("time");
    const reason = interaction.options.getString("reason");

    //const g = `986357448925401168` //Test server
    //const staff = `986600882810544138` //Test server staff role
	//const g = `752104036102176778`; //  nika server
	//const staff = `1071605420218650714`; // nika dev role
    const g = `946518364216520774`; //Neco server
    const staff = `970229987405877259`; //Neco server staff role

	if (!time) return interaction.reply({
        content: "You need to input a valid time! (ex: 15s, 7h, 5m)",
        ephemeral: true,
      });

    const num = time.replace(/\D/g, "");
    if (num === "") {
      return interaction.reply({
        content: "You need to input a valid time! (ex: 15s, 7h, 5m)",
        ephemeral: true,
      });
    }

    const letter = time.replace(/[^a-zA-Z]+/g, "");

    if (letter === "") {
      return interaction.reply({
        content: "You need to input a valid time! (ex: 15s, 7h, 5m)",
        ephemeral: true,
      });
    } else if (letter.length !== 1) {
      return interaction.reply({
        content: "You need to input a valid time! (ex: 15s, 7h, 5m)",
        ephemeral: true,
      });
    }

    if (letter === "s") {
      if (num === `1`) {
        client.letter = "second";
      } else {
        client.letter = "seconds";
      }
      client.tstime = Math.floor(num);
    } else if (letter === "m") {
      if (num === `1`) {
        client.letter = "minute";
      } else {
        client.letter = "minutes";
      }
      client.tstime = Math.floor(60 * num);
    } else if (letter === "h") {
      if (num === `1`) {
        client.letter = "hour";
      } else {
        client.letter = "hours";
      }
      client.tstime = Math.floor(60 * 60 * num);
    } else {
      return interaction.reply({
        content:
          "That is not a valid time! You can use seconds (ex: 8s), minutes (ex: 15m) and hours (ex: 1h)",
      });
    }
    const guild = client.guilds.cache.get(g);
    const member = guild.members.cache.get(user.id);
    const author = guild.members.cache.get(interaction.user.id);
    if (member.communicationDisabledUntilTimestamp < Date.now() === false) {
      return interaction.reply({
        content: `This user is already muted! This mute expires at <t:${Math.floor(
          member.communicationDisabledUntilTimestamp / 1000
        )}>`,
        ephemeral: true,
      });
    }
    if (!author.roles.cache.has("946525953033646130")) { // admin perms
      if (member.roles.cache.has(staff)) {
        return interaction.reply({
          content: `You cannot mute someone that is a staff member!`,
          ephemeral: true,
        });
      }
    }
    if (!member) {
      return interaction.reply({
        content: "You cant mute someone that isnt in the server.",
        ephemeral: true,
      });
    }
    if (user === interaction.user) {
      return interaction.reply({
        content: "You cannot mute yourself! Just stay shut, i guess",
        ephemeral: true,
      });
    }
    try {
      await member.timeout(client.tstime * 1000, reason);
    } catch (e) {
      const err = e.toString();
      client.er = true;
      if (err === "DiscordAPIError: Missing Permissions") {
        return interaction.reply({
          content: "I do not have permissions to mute that user!",
          ephemeral: true,
        });
      } else {
        return interaction.reply(
          `There was an error, ${err} <@!452436342841016341>`
        );
      }
    } finally {
      if (!client.er) {
        const CasesModel = require("../../../Structures/Schema/Cases");
        const RestartsModel = require("../../../Structures/Schema/Restarts");
        const r = await RestartsModel.findOne({ owner: "Darkeew" });
		if (!r) {
			await r.create({ cases: 1}) && await r.save();
		}
		interaction.reply({
		  embeds: [
			new MessageEmbed()
			  .setAuthor({ name: `Case ${r.cases}` })
			  .setDescription(
				`${user} has been muted for **${num} ${client.letter}** with reason: \`${reason}\``
			  )
			  .setColor(interaction.guild.me.displayHexColor || "DARK_RED")
			  .setFooter({ text: `Requested by ${interaction.user.tag}` })
			  .setTimestamp(),
		  ],
		});
        /* const ch = "1009968902941442119"; // teto-log
        const logs = guild.channels.cache.get(ch);
        logs.send({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: `User Muted` })
              .setColor("DARK_GOLD")
              .setDescription(
                `${user} has been muted for **${num} ${client.letter}** with reason: \`${reason}\`. This was done by ${interaction.user}.`
              )
              .setTimestamp(),
          ],
        }); */
        await CasesModel.create({
          punished: user.id,
          punisher: interaction.user.id,
          type: "mute",
          reason: reason,
          case: r.cases,
        });
        r.cases++;
        await r.save();
      }
    }
  },
};
