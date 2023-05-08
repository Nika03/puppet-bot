const color = require("colors");
const { Message, MessageEmbed, Client } = require("discord.js");
const { tenorMSG } = require('../../Functions/getTenor');

module.exports = {
	name: "messageCreate",
	/**
	 * @param {Message} message
	 * @param {Client} client
	 */
	async execute(message, client) {
		const content = message.content
		
		const prefix = "+";
		if (!message.content.startsWith(prefix) || message.author.bot) return;
		const args = message.content.toLowerCase().slice(prefix.length).trim().split(/ +/);
		const command = args.shift().toLowerCase();
		if(command === 'boop') {
			const user = message.mentions.users.first() || message.member.user
			const q = "boop_anime";
			try {
				tenorMSG(q, message, MessageEmbed, "pokes", message.member.user, user, " boop!");
			} catch (err) {
				console.log(err);
				message.channel.send('Oops, there was an error\n<@453944662093332490>');
			}
		} else if(command === 'cuddle') {
			const user = message.mentions.users.first() || message.member.user
			const q = "cuddle_anime";
			try {
				tenorMSG(q, message, MessageEmbed, "cuddles", message.member.user, user, "~ adorable!");
			} catch (err) {
				console.log(err);
				message.channel.send('Oops, there was an error\n<@453944662093332490>');
			}
		} else if(command === 'hold') {
			const user = message.mentions.users.first() || message.member.user
			const q = "hold_hands_anime";
			try {
				tenorMSG(q, message, MessageEmbed, "grabs", message.member.user, user, " hands~ awww");
			} catch (err) {
				console.log(err);
				message.channel.send('Oops, there was an error\n<@453944662093332490>');
			}
		} else if(command === 'hug') {
			const user = message.mentions.users.first() || message.member.user
			const q = "Anime_Hug";
			try {
				tenorMSG(q, message, MessageEmbed, "hugs", message.member.user, user, " a big hug!");
			} catch (err) {
				console.log(err);
				message.channel.send('Oops, there was an error\n<@453944662093332490>');
			}
		} else if(command === 'kiss') {
			const user = message.mentions.users.first() || message.member.user
			const q = "Anime_Kiss";
			try {
				tenorMSG(q, message, MessageEmbed, "kissed", message.member.user, user, "! OwO");
			} catch (err) {
				console.log(err);
				message.channel.send('Oops, there was an error\n<@453944662093332490>');
			}
		} else if(command === 'pat') {
			const user = message.mentions.users.first() || message.member.user
			const q = "pat_anime";
			try {
				tenorMSG(q, message, MessageEmbed, "pets", message.member.user, user, " Adorable~");
			} catch (err) {
				console.log(err);
				message.channel.send('Oops, there was an error\n<@453944662093332490>');
			}
		} else if(command === 'poke') {
			const user = message.mentions.users.first() || message.member.user
			const q = "poke_anime";
			try {
				tenorMSG(q, message, MessageEmbed, "pokes", message.member.user, user, " boop!");
			} catch (err) {
				console.log(err);
				message.channel.send('Oops, there was an error\n<@453944662093332490>');
			}
		} else if(command === 'snuggle') {
			const user = message.mentions.users.first() || message.member.user
			const q = "snuggle_anime";
			try {
				tenorMSG(q, message, MessageEmbed, "cuddles", message.member.user, user, "~ adorable!");
			} catch (err) {
				console.log(err);
				message.channel.send('Oops, there was an error\n<@453944662093332490>');
			}
		} else if(command === 'tickle') {
			const user = message.mentions.users.first() || message.member.user
			const q = "tickle_anime";
			try {
				tenorMSG(q, message, MessageEmbed, "tickles", message.member.user, user, " Ha!");
			} catch (err) {
				console.log(err);
				message.channel.send('Oops, there was an error\n<@453944662093332490>');
			}
		}
	},
};
