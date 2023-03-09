const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
	name: "unmute",
	description: "Unmute an member that has been behaving badly.",
	permission: "MANAGE_MESSAGES",
	type: "Moderation",
	usage: "`/unmute [user] [reason]`",
	options: [
		{
			name: "user",
			description: "The user to mute.",
			type: "USER",
			required: true,
		},
		{
			name: "reason",
			description: "The reason why the user got muted.",
			type: "STRING",
			required: true,
		},
	],
	/**
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {
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
		if (!member.isCommunicationDisabled()) {
			return interaction.reply({
				content: `This member isn\' muted!`,
				ephemeral: true,
			});
		}
		if (!author.roles.cache.has("946525953033646130")) { // admin perms
			if (member.roles.cache.has(staff)) {
				return interaction.reply({
					content: `You cannot unmute someone that is a staff member!`,
					ephemeral: true,
				});
			}
		}
		if (!member) {
			return interaction.reply({
				content: "You cant unmute someone that isnt in the server.",
				ephemeral: true,
			});
		}
		if (user === interaction.user) {
			return interaction.reply({
				content: "You cannot unmute yourself! Just stay shut, i guess",
				ephemeral: true,
			});
		}
		try {
			await member.timeout(null, reason);
		} catch (e) {
			const err = e.toString();
			client.er = true;
			if (err === "DiscordAPIError: Missing Permissions") {
				return interaction.reply({
					content: "I do not have permissions to mute that user!",
					ephemeral: true,
				});
			} else {
				return interaction.reply(
					`There was an error, ${err} <@!452436342841016341>`
				);
			}
		}

		const newEmbed = new MessageEmbed()
			//.setAuthor({ name: `Case ${r.cases}` })
			.setDescription(`${user} has been unmuted by: **${interaction.user}** with reason:\n\`\`\`${reason}\`\`\``)
			.setColor(interaction.guild.me.displayHexColor || "DARK_RED")
			.setFooter({ text: `Requested by ${interaction.user.tag}` })
			.setTimestamp()

		interaction.reply({ embeds: [newEmbed] });

	},
};
