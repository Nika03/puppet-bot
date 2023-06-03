const color = require("colors");
const { Message, MessageEmbed, Client } = require("discord.js");

module.exports = {
	name: "messageUpdate",
	/**
	 * @param {Message} message
	 * @param {Client} client
	 */
	async execute(oldmessage, newmessage, client) { // we already have a bot for this
		if(oldmessage === newmessage) return console.log("this shouldn't ahve happaned (messageUpdate)");
		if(newmessage.author.bot) return;
		/* const chID = "986243613035999232" // message-logs
		const channel = client.channels.cache.get(chID);
		const URL = `https://discord.com/channels/${newmessage.guildId}/${newmessage.channelId}/${newmessage.id}`;

		const newEmbed = new MessageEmbed()
			.setTitle("Message Edited")
			.setDescription(`**User**: ${newmessage.author} | ${newmessage.author.id}\n**Channel**: ${URL} \`[#${newmessage.channel.name}]\`\n**Before**:\n${oldmessage.content}\n\n**After**:\n${newmessage.content}`)
			.setColor("#FAFA33")
			.setFooter({ text: `Message ID: ${newmessage.id}` })
			.setTimestamp()
		
		channel.send({ embeds: [newEmbed] }); */
	},
};
