const { Client } = require("discord.js");
//const { twitch } = require('../../Functions/twitch');
const axios = require('axios');
const { MessageEmbed } = require('discord.js')
const twitchDB = require('../../Structures/Schema/twitch');
const { twitch } = require("../../Functions/twitch");

module.exports = {
	name: "ready",
	/**
	 * @param {Client} client
	 * @param {Guild} guild
	 */
	async execute(client) {

		const ch = "1071605349217476638" // twtich channel

		/* let streamers = ["Dinip", "xQc"];
		
		setInterval(() => { twitch(client, ch, streamers); }, 60 * 1000); // cada minuto */

		const users = ["xQc", "Dinip"];
		setInterval(async function () { twitch(client, ch, users) }, 60 * 1000);
	},
};
