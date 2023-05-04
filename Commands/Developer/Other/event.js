const { CommandInteraction } = require("discord.js");

module.exports = {
	name: "event",
	description: "Send a premade msg realated to the event",
	permission: "ADMINISTRATOR",
	type: "Other",
	usage: "/event",
	options: [
		{
			name: `channel`,
			description: `The channel to send the msg to.`,
			type: `CHANNEL`,
			required: true,
		},
	],
	/**
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		/* interaction.reply({
			content: "This command is currently disabled.",
			ephemeral: true,
		}); */

		const channel = interaction.options.getChannel("channel");

		let MSG = `**2X TCOINS EVENT**\nMake sure to use </search:1080869346143912001>, </ask:1080869345657376892> and </daily:1080869345657376897> in <#946522737491443763> to get double the coins!!!!\nThe Event will end in: <t:1683410400:R>\nhttps://tenor.com/buFc4.gif`;

		channel.send({ content: MSG }).then(interaction.reply({ content: "done!", ephemeral: true }));
	},
};
