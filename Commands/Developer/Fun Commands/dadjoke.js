const { CommandInteraction, MessageEmbed } = require("discord.js");
const axios = require('axios').default;

module.exports = {
	name: "dadjoke",
	description: "Get a dad joke.",
	permission: "SEND_MESSAGES",
	type: "Fun",
	usage: "`/dadjoke`",
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
			if (!is_blacklisted.commands.includes(`dadjoke`)) {
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

		//axios.get('https://icanhazdadjoke.com', { headers: { 'Accept': 'application/json' } }).then(response => { console.log(response.data.joke); })
		const data = await axios.get('https://icanhazdadjoke.com', { headers: { 'Accept': 'application/json' } });
		const joke = data.data.joke;

		const newEmbed = new MessageEmbed()
			.setTitle(`Dad joke:`)
			.setDescription(`\`\`\`${joke}\`\`\``)
			.setColor(interaction.guild.me.displayHexColor || "DARK_RED")
			.setFooter({ text: `Requested by ${interaction.user.tag}` })
			.setTimestamp()

		interaction.reply({ embeds: [newEmbed] });
	},
};
