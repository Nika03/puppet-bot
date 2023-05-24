const { CommandInteraction, MessageEmbed } = require("discord.js");
const axios = require('axios').default;
const { RapidAPI } = require("../../../Structures/config.json");

module.exports = {
	name: "meme",
	description: "Get a dad joke.",
	permission: "SEND_MESSAGES",
	type: "Fun",
	usage: "`/meme`",
	/**
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {

		const options = {
			method: 'GET',
			url: 'https://programming-memes-images.p.rapidapi.com/v1/memes',
			headers: {
				'X-RapidAPI-Key': RapidAPI,
				'X-RapidAPI-Host': 'programming-memes-images.p.rapidapi.com'
			}
		};

		const response = await axios.request(options).catch(err => console.log(err));

		const meme = response.data[0].image;
		const newEmbed = new MessageEmbed()
			.setTitle(`Programing meme:`)
			.setImage(meme)
			.setColor(interaction.guild.me.displayHexColor || "DARK_RED")
			.setFooter({ text: `Requested by ${interaction.user.tag}` })
			.setTimestamp()

		interaction.reply({ embeds: [newEmbed] });
	},
};
