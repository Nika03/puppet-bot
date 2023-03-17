const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
	name: "vreaction",
	description: "Change the verification reaction.",
	permission: "MANAGE_MESSAGES",
	type: "Other",
	usage: "`/vreaction, /vreaction [color]`",
	options: [
		{
			name: `color`,
			description: `The color for the verefication system.`,
			required: false,
			type: `STRING`,
			choices: [
				{
					name: "Blue",
					value: "BLUE",
				},
				{
					name: "Brown",
					value: "BROWN",
				},
				{
					name: "Green",
					value: "GREEN",
				},
				{
					name: "Orange",
					value: "ORANGE",
				},
				{
					name: "Red",
					value: "RED",
				},
				{
					name: "Purple",
					value: "PURPLE",
				},
			],
		},],
	/**
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {

		const theColor = await interaction.options.getString("color");

		const guild = client.guilds.cache.get("946518364216520774"); // puppet server
		const channel = guild.channels.cache.get("946528426687336559"); // verify-here
		//const guild = client.guilds.cache.get("752104036102176778"); // nika server
		//const channel = guild.channels.cache.get("1072243970261921792"); // static
		let rc = await Math.floor(Math.random() * 5);
		if(theColor) rc = theColor;
		if (rc === 0 || rc === "RED") client.color = "🟥"; // RED
		if (rc === 1 || rc === "GREEN") client.color = "🟩"; // GREEN
		if (rc === 2 || rc === "BLUE") client.color = "🟦"; // BLUE
		if (rc === 3 || rc === "BROWN") client.color = "🟫"; // BROWN
		if (rc === 4 || rc === "ORANGE") client.color = "🟧"; // ORANGE
		if (rc === 5 || rc === "PURPLE") client.color = "🟪"; // PURPLE
		channel.messages.fetch("1082004543870599229").then((m) => { // msg id verify-here puppets
			try {
				m.edit({
					embeds: [
						new MessageEmbed()
							.setAuthor({ name: "Verification" })
							.setDescription(
								`
  Hello! Welcome to **Neco Puppeteers' Cult.** 
  
  > In order to verify, you need to press the ${client.color} reaction. Failing to do this will get you timed out for 5 minutes.
  
  > **Having problems?**
  Open a ticket in <#946523109924696074>! The staff members will assist you further.
  
  Remember, have fun in the server!
            `
							)
							.setColor(interaction.guild.me.displayHexColor || "DARK_RED")
							.setTimestamp(),
					],
				});
			} catch (e) {
				console.log(e);
			}
		});
		interaction.reply({
			embeds: [
				new MessageEmbed()
					.setDescription(
						`The reaction for verification has been succesfully changed. You can see it in <#${channel}>`
					)
					.setColor(interaction.guild.me.displayHexColor || "DARK_RED"),
			],
			ephemeral: true,
		});
	},
};
