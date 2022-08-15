const { CommandInteraction, MessageEmbed, GuildEmoji } = require("discord.js");

module.exports = {
  name: "ban",
  description: "Ban an user.",
  permission: "BAN_MEMBERS",
  options: [
    {
      name: `user`,
      description: `The user to ban.`,
      type: `USER`,
      required: true,
    },
    {
      name: `reason`,
      description: `The reason of the ban.`,
      type: `STRING`,
    },
    {
      name: `time`,
      description: `The time for the ban. (ex: 1d, 7h, 9m)`,
      type: `STRING`,
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
    //const trainee = `986600882810544138` //Test server trainee role
    const g = `946518364216520774`; //Neco server
    const staff = `970229987405877259`; //Neco server staff role
    const trainee = `946525021545828422`; //Neco server trainee role

    //Change this

    const user = interaction.options.getUser(`user`);
    const reason = interaction.options.getString(`reason`);
    const time = interaction.options.getString(`time`);

    if (user === interaction.user.id) {
      return interaction.reply({
        content: "You cannot ban yourself!",
        ephemeral: true,
      });
    }

    const guild = client.guilds.cache.get(g);
    const member = guild.members.cache.get(user.id);

    if (member) {
      if (member.roles.cache.has(staff)) {
        return interaction.reply({
          content: `You cannot ban someone that is a staff member!`,
          ephemeral: true,
        });
      }

      if (member.roles.cache.has(trainee)) {
        return interaction.reply({
          content: `You cannot ban someone that is a staff member!`,
          ephemeral: true,
        });
      }
    }

    const CasesModel = require(`../../Structures/Schema/Cases`);
    const e1 = user.toString().replace("<@!", "");
    const e2 = e1.replace(">", "");
    const is_banned = await CasesModel.findOne({
      punished: e2,
      type: "ban",
      expired: "false",
    });
    if (is_banned) {
      return interaction.reply({
        content: `This user is already banned!`,
        ephemeral: true,
      });
    }
    const RestartsModel = require(`../../Structures/Schema/Restarts`);
    const find_cases = await RestartsModel.findOne();
    if (!find_cases.cases) {
      await RestartsModel.updateOne({}, { cases: 1 });
    }
    const restart = await RestartsModel.findOne();

    if (reason === null) {
      global.reason = `**no reason**`;
    } else {
      global.reason = `reason: \`${reason}\``;
    }
    if (time !== null) {
      const num = time.replace(/\D/g, "");
      if (num === "") {
        return interaction.reply({
          content: "You need to input a valid time! (ex: 1d, 7h, 5m)",
          ephemeral: true,
        });
      }

      const letter = time.replace(/[^a-zA-Z]+/g, "");

      if (letter === "") {
        return interaction.reply({
          content: "You need to input a valid time! (ex: 1d, 7h, 5m)",
          ephemeral: true,
        });
      } else if (letter.length !== 1) {
        return interaction.reply({
          content: "You need to input a valid time! (ex: 1d, 7h, 5m)",
          ephemeral: true,
        });
      }

      if (letter === "d") {
        if (num === `1`) {
          global.letter = "day";
        } else {
          global.letter = "days";
        }
        global.tstime = Math.floor(60 * 60 * 24 * num + Date.now() / 1000);
      } else if (letter === "m") {
        if (num === `1`) {
          global.letter = "minute";
        } else {
          global.letter = "minutes";
        }
        global.tstime = Math.floor(60 * num + Date.now() / 1000);
      } else if (letter === "h") {
        if (num === `1`) {
          global.letter = "hour";
        } else {
          global.letter = "hours";
        }
        global.tstime = Math.floor(60 * 60 * num + Date.now() / 1000);
      }
      global.time = `for \`${num} ${global.letter}\``;
    } else {
      global.time = `**permanently**`;
    }
    const nc = restart.cases;
    await interaction.reply({
      embeds: [
        new MessageEmbed()
          .setAuthor({ name: `Case ${nc}` })
          .setColor("DARK_GOLD")
          .setDescription(
            `${user} has been banned ${global.time} with ${global.reason}.`
          )
          .setFooter({
            text: `You can change this with /case [case]! | Requested by ${interaction.user.tag}`,
          }),
      ],
    });
    if (reason === null) {
      global.reason = "reason not given";
    } else {
      global.reason = reason;
    }
    const edited1 = user.toString().replace("<@", "");
    const edited2 = edited1.replace(">", "");
    global.user = edited2;
    await CasesModel.create({
      punisher: `${interaction.user.id}`,
      punished: `${global.user}`,
      type: "ban",
      reason: global.reason,
      time: global.tstime,
      expired: false,
      case: nc,
    });
    restart.cases++;
    await restart.save();
    member
      .send({
        embeds: [
          new MessageEmbed().setDescription(
            `You have been banned for: \`${global.reason}\` in \`Puppet's Neco Cult\`. If you wish to appeal your ban, head over to https://forms.gle/CXawHH1m3tjJGDvs6 and fill up the form.`
          ),
        ],
      })
      .catch(() => {
        interaction.followUp({
          content: `I could not DM the user!`,
          ephemeral: true,
        });
      });
    setTimeout(() => {
      guild.members.ban(member);
    }, 1000);
  },
};
