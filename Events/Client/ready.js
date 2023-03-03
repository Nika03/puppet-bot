const color = require("colors");
const { Client } = require("discord.js");
const { connect } = require("mongoose");
const { MONGO_URI } = require("../../Structures/config.json");

module.exports = {
	name: "ready",
	once: true,
	/**
	 * @param {Client} client
	 * @param {Guild} guild
	 */
	async execute(client) {
		//client.user.setActivity("you from the closet.", { type: "WATCHING" });

		const arrayOfActivities = [
			//`Over ${client.guilds.cache.size} servers! 🙂`,
			//`Prefix is: "/"`,
			"/help | discord.gg/neco-arc",
			"I live in your walls"
			//`Over ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Users!`,
		];

		const arrayOfStatus = [
			'WATCHING',
			//'STREAMING',
			'WATCHING',
		]

		let counter = 0
		const updateActivities = () => {
			client.user.setPresence({
				status: 'online',
				activities: [{
					name: arrayOfActivities[counter],
					type: 'WATCHING',
				}]
			})

			if (++counter >= arrayOfActivities.length) {
				counter = 0
			}

			setTimeout(updateActivities, 100000)
		}
		updateActivities()

		client.guilds.cache.forEach(guild => {
			console.log(`${guild.name} | ${guild.id}`.brightRed);
		})

		connect(MONGO_URI, {}).then(() => console.log("Connected to mongoDB".brightGreen));

		console.log(`${client.user.username} bot is online!`.brightMagenta.bold);
	}
};
