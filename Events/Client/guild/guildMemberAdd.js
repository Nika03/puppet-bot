const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "guildMemberAdd",
	async execute(member) {
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
			const reason = "Your new nickname has more than 4 non QWERTY characters.\nPlease change it back and then message a mod so that they will remove the moderated nickname.";

			const newEmbed = new MessageEmbed()
				.setColor()
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
				})
			} catch (err) {
				console.log(err);
				console.log(`Couldn\'t send a dm to ${member.user.tag}(${member.user.id})`);
			}
		}
	},
};
