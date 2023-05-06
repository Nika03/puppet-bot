const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
	name: "ship",
	description: "Ship two people.",
	permission: "SEND_MESSAGES",
	type: "Actions",
	usage: "`/ship [user]`",
	options: [
		{
			name: `member`,
			description: "The member you'd like to ship.",
			type: "SUB_COMMAND",
			options: [
				{
					name: `member`,
					description: `First member.`,
					type: "USER",
					required: true,
				}
			],
		}, {
			name: `members`,
			description: "Ship two memebers.",
			type: "SUB_COMMAND",
			options: [
				{
					name: `member`,
					description: `First member.`,
					type: "USER",
					required: true,
				}, {
					name: `memmber`,
					description: `Second member.`,
					type: "USER",
					required: true,
				},
			],
		}
	],
	/**
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		const user = interaction.options.getUser(`member`);
		const member2 = interaction.options.getUser(`memmber`);

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

		const numbers2 = [`**0%** - **${member}** and **${member2}** are ENEMIES! 💀`, `**5%** - **${member}** and **${member2}** are ENEMIES! 💀`,
		`**10%** - **${member}** and **${member2}** are not compatible! 💔`, `**15%** - **${member}** and **${member2}** are not compatible! 💔`,
		`**20%** - **${member}** and **${member2}** are not compatible! 💔`, `**25%** - **${member}** and **${member2}** are not compatible! 💔`,
		`**30%** - **${member}** and **${member2}** are jmemberst friends! 💛`, `**35%** - **${member}** and **${member2}** are jmemberst friends! 💛`,
		`**40%** - **${member}** and **${member2}** are jmemberst friends! 💛`, `**45%** - **${member}** and **${member2}** are jmemberst friends! 💛`,
		`**50%** - **${member}** and **${member2}** are jmemberst friends! 💛`, `**55%** - **${member}** and **${member2}** are jmemberst friends! 💛`,
		`**60%** - **${member}** and **${member2}** are close friends! 💙`, `**65%** - **${member}** and **${member2}** are close friends! 💙`,
		`**70%** - **${member}** and **${member2}** are close friends! 💙`, `**75%** - **${member}** and **${member2}** are close friends! 💙`,
		`**80%** - **${member}** and **${member2}** are best friends! ❤`, `**85%** - **${member}** and **${member2}** are best friends! ❤`,
		`**90%** - **${member}** and **${member2}** are lovers! 💖`, `**95%** - **${member}** and **${member2}** are lovers! 💖`,
		`**100%** - **${member}** and **${member2}** are lovers! 💖`, `**100%** - **${member}** and **${member2}** are soulmates! 💕`]

		const numb2 = Math.floor(Math.random() * numbers.length);
		const resnumbers2 = numbers2[numb2];

		const embed2 = new MessageEmbed()
			.setTitle(`Love Calculator`)
			.setColor(resColor)
			.setDescription(resnumbers2);

		let content = `${member}, ${u} has decided to ship you.`;
		let content2 = `${member} and ${member2}, ${u} has decided to ship you two.`;

		if (interaction.toString() === `/ship member member:${member.id}`) {
			if (u.id === "468754136524128256" || u.id === "454182894823538689" && member.id === "468754136524128256" || member.id === "454182894823538689") { // nika and puppet
				return await interaction.reply({ content: content, embeds: [embed.setDescription(numbers[numbers.length - 1])] });
			}
			return await interaction.reply({ content: content, embeds: [embed] });
		}
		if (interaction.toString() === `/ship members member:${member.id} memmber:${member2.id}`) {
			if(u.id === member.id || u.id === member2.id) return interaction.reply({ content: `${u} you can't ship yourself.` });
			if(member.id === member2.id) return interaction.reply({ content: `You can't ship the same person!` });
			if(member.id === "468754136524128256" || member2.id === "454182894823538689" && member.id === "468754136524128256" || member2.id === "454182894823538689") return await interaction.reply({ content: content, embeds: [embed2.setDescription(numbers[numbers.length - 1])] });
			return await interaction.reply({ content: content2, embeds: [embed2] });
		}
		/* if(u.id === "453944662093332490") {
			return await interaction.reply({ embeds: [embed.setDescription(numbers[numbers.length - 1])] });
		} */

		//await interaction.reply({ content: content, embeds: [embed] });

	},
};
