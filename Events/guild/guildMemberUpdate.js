const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "guildMemberUpdate",
	async execute(oldMember, newMember, client) {
		const { guild } = newMember

		const ch = "1009968902941442119" // teto-log puppets
		const channel = client.channels.cache.get(ch);
		const regex = new RegExp(/[^\w\s\d\t\n\r~`!@#\$%\^&\*\(\)_\-\+={\[\}\]\|\\:;"'<,>\.\?\/\´ºª]/gi);
		// the function that generates the numbers
		const randomID = length => Math.floor(Math.random() * Math.pow(10, length));
		// replace 3 with how many characters you want
		randomID(3) // return example: 581
		const newnick = randomID(5)

		if (newMember.nickname && oldMember.nickname !== newMember.nickname) {
			if (newMember.nickname.includes("Moderated Nickname ")) return; //console.log(`${newMember.user.tag} | ${newMember.user.id} already has a mod nickname: ${oldMember.nickname}`);
			console.log(`${newMember.user.username}#${newMember.user.discriminator} has changed is nickname in "${newMember.guild.name}" from "${oldMember.nickname}" to "${newMember.nickname}"`);
			const newNick = newMember.nickname;
			function countNKC(str) {
				const nonKeyboardChars = str.match(regex) || [];
				return nonKeyboardChars.length;
			}
			let num = countNKC(newNick);
			let flag = 0;
			if(newNick.length <= num) flag = 1;
			//console.log("num: " + num);
			if (num > 4 || flag == 1) {
				//console.log("newNick: " + newNick + "\nnewNick length: " + newNick.length);
				const reason = "Your new nickname has more than 4 non QWERTY characters.\nPlease change it back and then message a mod so that they will remove the moderated nickname.";

				const newEmbed = new MessageEmbed()
					.setColor(newMember.displayHexColor || "DARK_GOLD")
					.setTitle(`Your nickname on \`${newMember.guild.name}\`has been changed!`)
					.setDescription(`It has been change to: \`Moderated Nickname ${newnick}\`.\n\`\`\`${reason}\`\`\``)
					.setTimestamp()
				try {
					newMember.setNickname("Moderated Nickname " + newnick);
				} catch (err) {
					console.log(err);
					console.log(`Couldn\'t change ${newMember.user} | ${newMember.user.id}`)
				}
				try {
					newMember.send({
						content: `<@${newMember.user.id}>`,
						embeds: [newEmbed]
					})
				} catch (err) {
					console.log(err);
					console.log(`Couldn\'t send a dm to ${newMember.user.tag}(${newMember.user.id})`);
				}
				try {
					const logEmbed = new MessageEmbed()
						.setColor(newMember.displayHexColor)
						.setThumbnail(guild.iconURL())
						.setTitle(`${newMember.user.tag}'s nickname on \`${newMember.guild.name}\`has been changed!`)
						.setDescription(`${newMember.user} | id: ${newMember.user.id}\nGuildId: \`${guild.id}\` MemberCount: ${guild.memberCount}\nOwner: <@!${guild.ownerId}> | ${guild.ownerId}`)
						.setTimestamp()

					channel.send({ embeds: [logEmbed] });

				} catch (err) {
					console.log(err);
					console.log(`Couldn't send the msg to ${channel}`);
				}
			}
		}
	},
};
