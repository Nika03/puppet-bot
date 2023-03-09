const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
	name: "servers",
	description: "Gives the current latency of the bot.",
	permission: "SEND_MESSAGES",
	type: "Utility",
	usage: "`/servers`",
	/**
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {

		let serverList = '';
		client.guilds.cache.forEach(guild => {
			//server_name = `${guild.name}`;
			//server_id = `${guild.id}`;
			serverList = serverList.concat(`**${guild.name}**\n${guild.id} | **${guild.memberCount}** Members\n`);
		});

		const serversEmbed = new MessageEmbed()
		.setColor(interaction.guild.me.displayHexColor || "GREEN")
			.setTitle(
				`Every server Teto Trader is in :)` // [${client.guilds.cache.size}]
			)
			.setDescription(`In **${client.guilds.cache.size}** Servers!\nWith **${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}** Users!\n\n${serverList}`)
			.setFooter({ text: `Requested by ${interaction.user.username} on ` + interaction.guild.name, iconURL: interaction.guild.iconURL() })
			.setTimestamp()
		interaction.reply({ embeds: [serversEmbed], ephemeral: true });
	},
};
