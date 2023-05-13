const colors = require('colors');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');

let hasSent = [];
async function twitch(client, ch, users) {
	for (const user of users) {

		const uptime = await axios.get(`https://decapi.me/twitch/uptime/${user}`);
		const avatar = await axios.get(`https://decapi.me/twitch/avatar/${user}`);
		const viewers = await axios.get(`https://decapi.me/twitch/viewercount/${user}`);
		const title = await axios.get(`https://decapi.me/twitch/title/${user}`);
		const game = await axios.get(`https://decapi.me/twitch/game/${user}`);

		if (uptime.data !== `${user} is offline`) {
			if (!hasSent[user]) {
				const embed = new MessageEmbed()
					.setAuthor({ name: `${user}`, iconURL: `${avatar.data}`, url: `https://www.twitch.tv/${user}` })
					.setTitle(`${title.data}`)
					.setThumbnail(`${avatar.data}`)
					.setURL(`https://www.twitch.tv/${user}`)
					.addFields({ name: "Game", value: `${game.data}`, inline: true })
					.addFields({ name: "Viewers", value: `${viewers.data}`, inline: true })
					.setImage(`https://static-cdn.jtvnw.net/previews-ttv/live_user_${user}-620x378.jpg`) // this ims always looks empty, I need to try to fix it.
					.setColor("BLURPLE")

				const channel = client.channels.cache.get(ch);
				//channel.send({content: "test", embeds: [embed] });
				console.log(`${user} is now LIVE!`.brightMagenta.bold);
				hasSent[user] = true;
			} else if (uptime.data === `${user} is offline`) {
				console.log(`${user} went offline!`.brightRed);
			}
		} else {
			hasSent[user] = false;
		}
	}
}

module.exports = { twitch };