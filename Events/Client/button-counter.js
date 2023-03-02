const { Client, Guild, MessageEmbed, Interaction } = require("discord.js");
const RestartsModel = require("../../Structures/Schema/Restarts");

module.exports = {
	name: "ready",
	/**
	 * @param {Client} client
	 * @param {Guild} guild
	 */
	async execute(client) {
		const guild = client.guilds.cache.get("752104036102176778");
		const channel = client.channels.cache.get("1072243970261921792");
		/* setInterval(async () => {
			let find = await RestartsModel.findOne({
				GuildID: guild
			});
			if (!find) {
				find = await RestartsModel.create({
					button_presses: 0
				})
			}
			await find.save();
			find = await RestartsModel.findOne();
			let counter = find.button_presses;
			channel.messages.fetch("1072254940610826261").then(async (m) => {
				m.edit({
					embeds: [
						new MessageEmbed()
							.setTitle("Press The Button!")
							.setDescription(
								`
Its simple, press the button, and the counter will go up!
    
> __Counter:__ \`${counter} clicks\`

Current Main Goal: \`500'000 clicks\`
> Prize: \`Top 3 will get a chance at getting Nitro Regular\`.
    
Current Subgoal: \`None\`
> Prize: \`None\`.
    
Updates in: <t:${Math.floor(Date.now() / 1000) + 60}:R>
*If the button isnt working, please DM <@!452436342841016341>. The counter will update each minute.*
          `
							)
							.setColor("DARK_RED"),
					],
				});
			});
		}, 60000); // 1 min */
	},
};
