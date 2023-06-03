const { MessageEmbed } = require("discord.js");
const moment = require('moment');

module.exports = {
	name: "guildMemberAdd",
	async execute(member, client) {
		const { guild } = member;

		const ch = "1009968902941442119" // teto-log puppets
		const channel = client.channels.cache.get(ch);
		const regex = new RegExp(/[^\w\s\d\t\n\r~`!@#\$%\^&\*\(\)_\-\+={\[\}\]\|\\:;"'<,>\.\?\/\´ºª]/gi);
		// the function that generates the numbers
		const randomID = length => Math.floor(Math.random() * Math.pow(10, length));
		// replace 3 with how many characters you want
		randomID(3) // return example: 581
		const newnick = randomID(5)
		if (member.user.username.includes("Moderated Nickname ")) return; //console.log(`${member.user.tag} | ${member.user.id} already has a mod nickname: ${oldMember.nickname}`);

		const newNick = member.user.username;
		function countNKC(str) {
			const nonKeyboardChars = str.match(regex) || [];
			return nonKeyboardChars.length;
		}
		let num = countNKC(newNick);
		if (num > 4) {
			const reason = "Your name has more than 4 non QWERTY characters.\nPlease change it and then message a mod so that they will remove the moderated nickname.";

			const newEmbed = new MessageEmbed()
				.setColor("DARK_GOLD")
				.setTitle(`Your nickname on \`${member.guild.name}\`has been changed!`)
				.setDescription(`It has been change to: \`Moderated Nickname ${newnick}\`.\n\`\`\`${reason}\`\`\``)
				.setTimestamp()
			try {
				member.setNickname("Moderated Nickname " + newnick);
			} catch (err) {
				console.log(err);
				console.log(`Couldn\'t change ${member.user} | ${member.user.id}`)
			}
			try {
				member.send({
					content: `<@${member.user.id}>`,
					embeds: [newEmbed]
				}).catch(err => { console.log(err); console.log("Couldn't dm the user.") });
			} catch (err) {
				console.log(err);
				console.log(`Couldn\'t send a dm to ${member.user.tag}(${member.user.id})`);
			}
			try {
				const logEmbed = new MessageEmbed()
					.setColor("DARK_GOLD")
					.setThumbnail(guild.iconURL())
					.setTitle(`${member.user.tag}'s nickname on \`${member.guild.name}\`has been changed!`)
					.setDescription(`${member.user} | id: ${member.user.id}\nGuildId: \`${guild.id}\` MemberCount: ${guild.memberCount}\nOwner: <@!${guild.ownerId}> | ${guild.ownerId}`)
					.setTimestamp()

				channel.send({ embeds: [logEmbed] });

			} catch (err) {
				console.log(err);
				console.log(`Couldn't send the msg to ${channel}`);
			}
		}

		// kicks the new members that don't verify in 1 hour from joining the server
		/* const defaultRoleID = '946524059724820500'; // Burenyuu (Default role)
		const kickTimeout = 3600000; // 1 hour in milliseconds

		setTimeout(() => {
			const defaultRole = member.guild.roles.cache.find(role => role.id === defaultRoleID);
			if (!defaultRole) {
				console.error(`${member.username} didn\'t verify in time (1hour) so he got kicked.`)
				return;
			}

			if (!member.roles.cache.has(defaultRole)) {
				member.send(`${member}\nHi! You didn\'t verify in time(1hour) in ${member.guild.name} so he kicked you, if you want to join the server again pls use this link:\nhttps://discord.gg/Vq9kTsrv8G`).catch(err => {console.error("couldn't dm the member, error in guildmemberadd")})
				member.kick('Didn\'t verify in time(1hour) so e got kicked.')
			}
		}, kickTimeout); */
		// END

		// logs into a channel when a new member joins
		/* const join_log = "986243613761605683" // join-leave-log puppet
		const log = client.channels.cache.get(join_log)
		const guilda = client.guilds.cache.get(member.guild.id);

		const joinDate = member.user.createdAt;
		const currentDate = moment();
		const duration = moment.duration(currentDate.diff(joinDate));
		const years = duration.years();
		const months = duration.months();
		const days = duration.days();

		const timeAgo = `${years} years, ${months} months and ${days} days ago`

		const newEmbed = new MessageEmbed()
			.setAuthor({ name: `${member.user.username}#${member.user.discriminator}`, iconURL: member.user.avatarURL(), url: `https://discordapp.com/users/${member.user.id}` })
			.setTitle(`Member Joined`)
			.setDescription(`${member} ${guilda.memberCount}th to join\nCreated ${timeAgo}`)
			.setColor("#00FF00")
			.setFooter({ text: `ID: ${member.user.id}` })
			.setTimestamp()

		log.send({ embeds: [newEmbed] }); */
		// END
	},
};
