const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
	name: "uptime",
	description: "Gives you the bot's uptime.",
	permission: "SEND_MESSAGES",
	type: "Utility",
	usage: "`/uptime`",
	/**
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {

		const { guild } = interaction;

		let totalSeconds = (client.uptime / 1000);
		let days = Math.floor(totalSeconds / 86400);
		totalSeconds %= 86400;
		let hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		let minutes = Math.floor(totalSeconds / 60);
		let seconds = Math.floor(totalSeconds % 60);

		let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

		const newEmbed = new MessageEmbed()
			.setColor(interaction.guild.me.displayHexColor || "DARK_GOLD")
			.setTitle('**My Uptime:**')
			.setDescription(uptime)
		interaction.reply({ embeds: [newEmbed], ephemeral: true});
	},
};
