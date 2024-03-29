const axios = require('axios');
const { TENOR } = require('../Structures/config.json');

const tenorMSG = async function Tenor(q, message, MessageEmbed, word, author, user, msg) {
	const limit = 50;
	await axios.get(`https://tenor.googleapis.com/v2/search?q=${q}&key=${TENOR}&limit=${limit}`).then(async response => {
		const gifResults = response.data.results;
		let randomGif = gifResults[Math.floor(Math.random() * gifResults.length)];
		const gif = randomGif.media_formats.gif.url
		//console.log(gif);
		const embed = new MessageEmbed()
			.setAuthor({ name: `${author.username} ${word} ${user.username}!`, url: randomGif.itemurl})
			.setColor("#2B2D31")
			.setImage(gif)
		if(!msg) await message.reply({ content: `<@${user.id}>`, embeds: [embed] }).catch(err => { console.log(err)});
		else await message.reply({ content: `<@${user.id}>`, embeds: [embed.setAuthor({ name: `${author.username} ${word} ${user.username}!${msg}`, url: randomGif.itemurl})] }).catch(err => { console.log(err)});
	}).catch(err => { console.log(err); });
}

const tenor = async function Tenor(q, interaction, MessageEmbed, word, author, user, msg) {
	const limit = 50;
	await axios.get(`https://tenor.googleapis.com/v2/search?q=${q}&key=${TENOR}&limit=${limit}`).then(async response => {
		const gifResults = response.data.results;
		let randomGif = gifResults[Math.floor(Math.random() * gifResults.length)];
		const gif = randomGif.media_formats.gif.url
		//console.log(gif);
		const embed = new MessageEmbed()
			.setAuthor({ name: `${author.username} ${word} ${user.username}!`, url: randomGif.itemurl})
			.setColor("#2B2D31")
			.setImage(gif)
		if(!msg) await interaction.reply({ content: `<@${user.id}>`, embeds: [embed] }).catch(err => { console.log(err)});
		else await interaction.reply({ content: `<@${user.id}>`, embeds: [embed.setAuthor({ name: `${author.username} ${word} ${user.username}!${msg}`, url: randomGif.itemurl})] }).catch(err => { console.log(err)});
	}).catch(err => { console.log(err); });
}

// my idea here was to return only the gif to the other file, but I think I can't return inside the .then()
module.exports = { tenor, tenorMSG };