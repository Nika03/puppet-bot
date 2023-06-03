const { MessageEmbed } = require("discord.js");
const moment = require('moment');

module.exports = {
	name: "guildMemberRemove",
	async execute(member, client) {
		// logs into a channel when a member leaves the server
		/* const join_log = "986243613761605683" // join-leave-log puppet
		const log = client.channels.cache.get(join_log)

		const joinDate = member.joinedAt;
		const currentDate = moment();
		const duration = moment.duration(currentDate.diff(joinDate));
		const years = duration.years();
		const months = duration.months();
		const days = duration.days();
		const min = duration.minutes();
		const sec = duration.seconds();
		let timeAgo;
		if(years == 0) {
			if(months == 0) timeAgo = `${days} days, ${min} min and ${sec} sec ago`;
			else timeAgo = `${months} months, ${days} days and ${min} min ago`;
		} else timeAgo = `${years} years, ${months} months and ${days} days ago`;

		const newEmbed = new MessageEmbed()
			.setAuthor({ name: `${member.user.username}#${member.user.discriminator}`, iconURL: member.user.avatarURL(), url: `https://discordapp.com/users/${member.user.id}` })
			.setTitle(`Member Left`)
			.setDescription(`${member} joined ${timeAgo}\n**Roles**: ${member.roles.cache.map(r => r).join(" ").replace("@everyone", " ")}`)
			.setColor("#FAFA33")
			.setFooter({ text: `ID: ${member.user.id}` })
			.setTimestamp()

		log.send({ embeds: [newEmbed] }); */
		// END
	},
};
