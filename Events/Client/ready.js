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
			//`Over ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Users!`,
			"/help | discord.gg/neco-arc",
			"you from the walls"
			/*  ideias for status given but chat <3
				Watching, lurking in the shadows, I see you.(001#0003 590871868731293726)
			
			*/
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
			console.log(`${guild.name} | ${guild.id} | ${guild.memberCount} members`.brightRed);
		})

		await connect(MONGO_URI, {}).then(() => console.log("Connected to mongoDB".brightGreen));

		console.log(`${client.user.username} bot is online!`.brightMagenta.bold);
	}
};
