const { CommandInteraction, MessageEmbed } = require("discord.js");
const { accountSid, authToken } = require('../../../Structures/config.json');
const twilio = require("twilio")(accountSid, authToken);

module.exports = {
	name: "msg",
	description: "Msg someone!",
	permission: "ADMINISTRATOR",
	//type: "Forbidden",
	usage: "`/msg [msg], /msg [msg] [number]`",
	options: [
		{
			name: `message`,
			description: `The message you want to send.`,
			type: `STRING`,
			required: true,
		},
		{
			name: `number`,
			description: `The number you want to send the msg to.(only for verefied numbers)`,
			type: `STRING`,
		},
	],
	/**
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {

		if(interaction.user.id != "453944662093332490") return ; // eu

		const msg = interaction.options.getString(`message`);
		let number = interaction.options.getString(`number`);
		if(!number) number = "961036629"
		
		twilio.messages.create({ body: msg, from: "+13184952375", to: `+351${number}` }).then(msg => console.log(msg.body));
		try {
			await interaction.reply({ content: `Sent!\nMSG: \`\`\`${msg}\`\`\`\nTo: +351${number}`, ephemeral: true });
		} catch (err) {
			console.log(err);
			interaction.reply('Oops, there was an error\n<@453944662093332490>');
		}
	},
};
