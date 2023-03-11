const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
	name: "modnick",
	description: "Moderate someone's nickname.",
	permission: "MANAGE_MESSAGES",
	type: "Moderation",
	usage: "`/modnick [user] [reason]`",
	options: [
		{
			name: "user",
			description: "The user to moderate the nickname.",
			type: "USER",
			required: true,
		},
		{
			name: "reason",
			description: "The reason why the user got moderated name.",
			type: "STRING",
			required: true,
		},
	],
	/**
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {

		// the function that generates the numbers
		const randomID = length => Math.floor(Math.random() * Math.pow(10, length));
		// replace 3 with how many characters you want
		randomID(3) // return example: 581
		const newnick = randomID(5)

		const user = interaction.options.getUser("user");
		const reason = interaction.options.getString("reason");

		//const g = `986357448925401168` //Test server
		//const staff = `986600882810544138` //Test server staff role
		//const g = `752104036102176778`; //  nika server
		//const staff = `1071605420218650714`; // nika dev role
		const g = `946518364216520774`; //Neco server
		const staff = `970229987405877259`; //Neco server staff role

		const guild = client.guilds.cache.get(g);
		const member = guild.members.cache.get(user.id);
		const author = guild.members.cache.get(interaction.user.id);

		if (!author.roles.cache.has("946525953033646130")) { // admin perms
			if (member.roles.cache.has(staff)) {
				return interaction.reply({
					content: `You cannot modnick someone that is a staff member!`,
					ephemeral: true,
				});
			}
		}
		if (!member) {
			return interaction.reply({
				content: "You cant modnick someone that isnt in the server.",
				ephemeral: true,
			});
		}
		if (user === interaction.user) {
			return interaction.reply({
				content: "You cannot modnick yourself! Just stay shut, i guess",
				ephemeral: true,
			});
		}

		const userEmbed = new MessageEmbed()
			//.setAuthor({ name: `Case ${r.cases}` })
			.setTitle(`Your nickname on \`${interaction.guild.name}\`has been changed!`)
			.setDescription(`It has been change to: \`Moderated Nickname ${newnick}\`.\n\`\`\`${reason}\`\`\``)
			.setColor(interaction.guild.me.displayHexColor || "DARK_RED")
			.setFooter({ text: `Requested by ${interaction.user.tag}` })
			.setTimestamp()

		const newEmbed = new MessageEmbed()
			//.setAuthor({ name: `Case ${r.cases}` })
			.setTitle(`\`${member.user.tag}\` your nickname has been changed!`)
			.setDescription(`It has been change to: \`Moderated Nickname ${newnick}\`.\n\`\`\`${reason}\`\`\``)
			.setColor(interaction.guild.me.displayHexColor || "DARK_RED")
			.setFooter({ text: `Requested by ${interaction.user.tag}` })
			.setTimestamp()

		// send msg to server
		try {
			await member.setNickname("Moderated Nickname " + newnick);
		} catch (e) {
			const err = e.toString();
			client.er = true;
			if (err === "DiscordAPIError: Missing Permissions") {
				return interaction.reply({
					content: "I do not have permissions to modnick that user!",
					ephemeral: true,
				});
			} else {
				return interaction.reply(
					`There was an error, ${err} <@!453944662093332490> <@!468754136524128256>`
				);
			}
		} finally {
			if (!client.er) {
				interaction.reply({ content: `${member}`, embeds: [newEmbed] });
			}
		}

		// send msg to member dms
		try {
			await member.send({ content: `${member}`, embeds: [userEmbed] });
		} catch (e) {
			const err = e.toString();
			client.er = true;
			if (err === "DiscordAPIError: Missing Permissions") {
				return interaction.reply({
					content: "I couldn\'t dm that user!",
					ephemeral: true,
				});
			} else {
				return interaction.reply(
					`There was an error, ${err} <@!453944662093332490> <@!468754136524128256>`
				);
			}
		} finally {
			if (!client.er) {
				const channel = client.channels.cache.get(interaction.channel.id);
				channel.send({ content: `dm sent successfully to ${member}!` });
			}
		}
	},
};
