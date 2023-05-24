const { CommandInteraction, MessageEmbed } = require("discord.js");
const axios = require('axios');

module.exports = {
	name: "yomama",
	description: "Get a Yomama joke.",
	permission: "SEND_MESSAGES",
	type: "Fun",
	usage: "`/yomama`",
	/**
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {

		// to verify if the command is available in that channel
		const SettingsModel = require("../../../Structures/Schema/Settings.js");
		const is_blacklisted = await SettingsModel.findOne({
			channel: interaction.channel.id,
		});
		if (is_blacklisted !== null) {
			if (!is_blacklisted.commands.includes(`yomama`)) {
				return interaction.reply({
					embeds: [
						new MessageEmbed().setDescription(
							`This command has been disabled in this channel.`
						),
					],
					ephemeral: true,
				});
			}
		} else if (!is_blacklisted) {
			return interaction.reply({
				embeds: [
					new MessageEmbed().setDescription(
						`This command has been disabled in this channel.`
					),
				],
				ephemeral: true,
			});
		}
		// to verify if the command is available in that channel

		const data = await axios.get('https://api.yomomma.info');
		const joke = data.data.joke;

		const newEmbed = new MessageEmbed()
			.setTitle(`Yo Mama Joke:`)
			.setDescription(`\`\`\`${joke}\`\`\``)
			.setColor(interaction.guild.me.displayHexColor || "DARK_RED")
			.setFooter({ text: `Requested by ${interaction.user.tag}` })
			.setTimestamp()

		interaction.reply({ embeds: [newEmbed] });
	},
};
