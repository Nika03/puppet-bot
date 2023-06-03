const color = require("colors");
const { Message, MessageEmbed, Client } = require("discord.js");

module.exports = {
	name: "messageDelete",
	/**
	 * @param {Message} message
	 * @param {Client} client
	 */
	async execute(message, client) { // we already have a bot for this
		/* const chID = "986243613035999232" // message-logs
		const channel = client.channels.cache.get(chID);
		const URL = `https://discord.com/channels/${message.guildId}/${message.channelId}`;

		const newEmbed = new MessageEmbed()
			.setTitle("Message Deleted")
			.setDescription(`**User**: ${message.author} | ${message.author.id}\n**Channel**: ${URL} \`[#${message.channel.name}]\`\n\`\`\`${message.content}\`\`\``)
			.setColor("DARK_RED")
			.setFooter({ text: `Message ID: ${message.id}` })
			.setTimestamp()
		
		channel.send({ embeds: [newEmbed] }); */
	},
};
