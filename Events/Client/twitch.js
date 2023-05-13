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

		const users = ["xQc", "Dinip"];

		setInterval(async function () { twitch(client, ch, users) }, 5 * 60 * 1000); // 60 * 1000 every minute // 5 * 60 * 1000 every 5 min
	},
};
