const { CommandInteraction, MessageEmbed } = require("discord.js");
const fs = require('fs');

module.exports = {
	name: "massmodnick",
	description: "saves all members ids that have more than 4 non qwerty chars",
	permission: "ADMINISTRATOR",
	type: "Other",
	usage: "`/massmodnick`",
	options: [
		{
			name: "reason",
			description: "The reason why the users are getting moderated names.",
			type: "STRING",
			required: true,
		},
	],
	/**
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {

		const { member } = interaction
		const { guild } = member;

		const reason = interaction.options.getString("reason");

		const ch = "1009968902941442119" // teto-log puppets
		const channel = client.channels.cache.get(ch);
		const regex = new RegExp(/[^\w\s\d\t\n\r~`!@#\$%\^&\*\(\)_\-\+={\[\}\]\|\\:;"'<,>\.\?\/\´ºª]/gi);
		// the function that generates the numbers
		const randomID = length => Math.floor(Math.random() * Math.pow(10, length));
		// replace 3 with how many characters you want
		randomID(3) // return example: 581
		const newnick = randomID(5)
		if (member.user.username.includes("Moderated Nickname ")) return; //console.log(`${member.user.tag} | ${member.user.id} already has a mod nickname: ${oldMember.nickname}`);

		const userEmbed = new MessageEmbed()
			//.setAuthor({ name: `Case ${r.cases}` })
			.setTitle(`Your nickname on \`${interaction.guild.name}\`has been changed!`)
			.setDescription(`It has been change to: \`Moderated Nickname ${newnick}\`.\n\`\`\`${reason}\`\`\``)
			.setColor(interaction.guild.me.displayHexColor || "DARK_RED")
			.setFooter({ text: `Requested by ${interaction.user.tag}` })
			.setTimestamp()

		function countNKC(str) {
			const nonKeyboardChars = str.match(regex) || [];
			return nonKeyboardChars.length;
		}

		let newNick, num, numb, theNickname;
		let memberarr = [];
		const members = guild.members.cache
		let count = 0;
		members.forEach(member => {
			newNick = member.user.username
			theNickname = member.nickname
			if(theNickname != null ) return false;
			num = countNKC(newNick);
			let flag = 0;
			if(newNick.length <= num) flag = 1;
			//numb = countNKC2(theNickname)
			//console.log(newNick + "\nnum: " + num)
			//if (member.nickname.includes("Moderated Nickname ")) return;
			if (num > 4 || flag == 1) {
				//console.log(member.nickname)
				memberarr.push(`<@${member.user.id}>`)
				try {
					member.setNickname("Moderated Nickname " + newnick);
					member.send({ embeds: [userEmbed] });
				} catch (err) {
					console.log("couldn't set or send the message to the member.");
				}
			}
			//console.log(member.user.username)
			count++;

			//console.log("count: " + count)
		});
		const serverId = '946518364216520774';
		const server = client.guilds.cache.get(serverId);

		const memberIds = members.map(member => member.user.id);
		//console.log(memberarr)
		fs.writeFile('member-ids.txt', memberarr.join('\n'), err => {
			if (err) throw err;
			console.log('Member IDs saved to file.');
		});
		interaction.reply({ content: "yes? " + (interaction.guild.memberCount - count), ephemeral: true })
	},
};
