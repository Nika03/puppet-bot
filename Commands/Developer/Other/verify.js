const { CommandInteraction, MessageEmbed, Message } = require("discord.js");
const fs = require('fs');

module.exports = {
	name: "verify",
	description: "Verifies a number of members that don\' have the default role.",
	permission: "ADMINISTRATOR",
	type: "Other",
	usage: "`/verify`",
	options: [
		{
			name: "number",
			description: "The number of members to verify.",
			type: "NUMBER",
			required: true,
		},
	],
	/**
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {

		const { member } = interaction
		const { guild } = member;

		let number = interaction.options.getNumber("number");
		number = number - 1;

		const members = guild.members.cache;

		let mod = false;
		if (member.roles.cache.has("970229987405877259")) mod = true;
		// check if is admin
		let admin = false;
		if (member.roles.cache.has("946525953033646130")) admin = true;
		if(!(mod || admin)) return;

		let list = []
		let count = 0;
		members.forEach(member => {
			
			const ch = '1009400793583071243';
			const channel = client.channels.cache.get(ch);
			if (count > number) return;
			let flag = false
			flag = member.roles.cache.has("946524059724820500")
			if (flag === false) {
				member.roles.add("946524059724820500"); // default role puppet
				member.roles.add("963473020108824647"); // Ping: Random Stuff
				list.push(`[${count}] <@${member.id}> | ${member.id}`);
				//channel.send(`[${count}] <@${member.id}> | ${member.id}`);
				//console.log(count);
				count++;
			}
		});
		const newEmbed = new MessageEmbed()
			.setColor(0x2b2d31)
			.setTimestamp()

		list = list.toString().replaceAll(",","\n");
		interaction.reply({ content: "done!", embeds: [newEmbed.setDescription(list)], ephemeral: true })

	},
};
