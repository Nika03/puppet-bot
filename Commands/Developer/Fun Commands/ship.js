const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
	name: "ship",
	description: "Ship two people.",
	permission: "SEND_MESSAGES",
	type: "Fun",
	usage: "`/ship [user]`",
	options: [
		{
			name: `member`,
			description: `The member you'd like to ship.`,
			required: true,
			type: `USER`,
		}
	],
	/**
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		const user = interaction.options.getUser(`member`);

		const colors = ['#282C34', '#E06C75', '#98C379', '#E5C07b', '#61AFEF', '#C678DD', '#56B6C2', '#ABB2BF', '#6B859E', '#3890E9', '#A359ED', '#EC5252', '#C97016', '#5DA713', '#13AFAF'];
		const color = Math.floor(Math.random() * colors.length);
		const resColor = colors[color];

		const member = await interaction.guild.members.fetch(user.id).catch(console.error);
		const u = interaction.user;

		const numbers = [`**0%** - **${u}** and **${member}** are ENEMIES! 💀`, `**5%** - **${u}** and **${member}** are ENEMIES! 💀`,
		`**10%** - **${u}** and **${member}** are not compatible! 💔`, `**15%** - **${u}** and **${member}** are not compatible! 💔`,
		`**20%** - **${u}** and **${member}** are not compatible! 💔`, `**25%** - **${u}** and **${member}** are not compatible! 💔`,
		`**30%** - **${u}** and **${member}** are just friends! 💛`, `**35%** - **${u}** and **${member}** are just friends! 💛`,
		`**40%** - **${u}** and **${member}** are just friends! 💛`, `**45%** - **${u}** and **${member}** are just friends! 💛`,
		`**50%** - **${u}** and **${member}** are just friends! 💛`, `**55%** - **${u}** and **${member}** are just friends! 💛`,
		`**60%** - **${u}** and **${member}** are close friends! 💙`, `**65%** - **${u}** and **${member}** are close friends! 💙`,
		`**70%** - **${u}** and **${member}** are close friends! 💙`, `**75%** - **${u}** and **${member}** are close friends! 💙`,
		`**80%** - **${u}** and **${member}** are best friends! ❤`, `**85%** - **${u}** and **${member}** are best friends! ❤`,
		`**90%** - **${u}** and **${member}** are lovers! 💖`, `**95%** - **${u}** and **${member}** are lovers! 💖`,
		`**100%** - **${u}** and **${member}** are lovers! 💖`, `**100%** - **${u}** and **${member}** are soulmates! 💕`]

		const numb = Math.floor(Math.random() * numbers.length);
		const resnumbers = numbers[numb];

		const embed = new MessageEmbed()
			.setTitle(`Love Calculator`)
			.setColor(resColor)
			.setDescription(resnumbers);
		await interaction.reply({ content: `${u} decided to ship ${member}.` , embeds: [embed] });

	},
};
