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

		setInterval(async function () { twitch(client, ch, users) }, 10 * 60 * 1000); // 60 * 1000 every minute // 10 * 60 * 1000 every 10 min
	},
};
