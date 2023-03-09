const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
	name: "guildMemberUpdate",
	async execute(oldMember, newMember) {
		const regex = new RegExp(/^[a-zA-Z0-9~`!@#\$%\^&\*\(\)_\-\+={\[\}\]\|\\:;"'<,>\.\?\/  ]/gi);
		// the function that generates the numbers
		const randomID = length => Math.floor(Math.random() * Math.pow(10, length));
		// replace 3 with how many characters you want
		randomID(3) // return example: 581
		const newnick = randomID(5)
		/* if (newMember.nickname && oldMember.nickname !== newMember.nickname) {
			//if (regex.test(newMember.nickname) == false) {
			const newNick = newMember.nickname;
			const newNick1 = newMember.nickname;
			const theregex = newNick.match(regex);
			console.log("newNick: " + newNick1 + "\nnewNick length: " + newNick1.length);
			if (regex.test(newMember.nickname)) {
				if (newMember.nickname.match(regex).length > 4) {
					console.log("dentro do ultimo if");
	
					const reason = "Your new nickname has more than 4 non QWERTY characters.\nPlease change it back and then message a mod so that they will remove the moderated nickname.";
	
					const newEmbed = new MessageEmbed()
						.setColor()
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
					}
				}
			}
		} */
	},
};
