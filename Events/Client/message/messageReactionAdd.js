const color = require("colors");
const { Client, MessageEmbed } = require("discord.js");

module.exports = {
	name: "messageReactionAdd",
	/**
	 * @param {Client} client
	 * @param {Guild} guild
	 */
	async execute(reaction, user, client) {

		const handleUpvoteBoard = async () => {
			const ch = "946530660112298065" // starboard puppet
			const avatar = user.avatarURL();
			const attachment = reaction.message.attachments.first();
			const url = attachment ? attachment.url : null;
			const upChannel = client.channels.cache.get(ch);
			const msgs = await upChannel.messages.fetch({ limit : 100 });
			//const SendMsg = msgs.find(msg => msg.embeds.length === 1 ? (msg.embeds[0].footer.text.startsWith(reaction.message.id) ? true: false) : false );
			const SendMsg = msgs.find(msg => msg.embeds.length === 1 && msg.embeds[0].footer && msg.embeds[0].footer.text && msg.embeds[0].footer.text.startsWith(reaction.message.id));
			
			if(SendMsg) SendMsg.edit(`<:upvote:1090959605619757128> ${reaction.count} <#${reaction.message.channelId}>`);
			else {
				const embed = new MessageEmbed()
				.setAuthor({ name: reaction.message.author.username, iconURL: avatar })
				.setDescription(`${reaction.message.content}\n\n**Source**\n[Jump!](https://discord.com/channels/${reaction.message.guildId}/${reaction.message.channelId}/${reaction.message.id})`)
				.setColor(0x2b2d31)
				.setFooter({ text: reaction.message.id })
				.setTimestamp()
				if(url) embed.setImage(`${url}`);
				if(upChannel) upChannel.send({ content: `<:upvote:1090959605619757128> 4 <#${reaction.message.channelId}>`, embeds: [embed] })
			}
		}
		if(reaction._emoji.name === "upvote") {
			if(reaction.message.partial) {
				await reaction.fetch();
				await reaction.message.fetch();
				if(reaction.count >= 4) handleUpvoteBoard();
			} else if(reaction.count >= 4) handleUpvoteBoard();
			
		}

		/* const ch = reaction.message.channelId; // geral test server
		const channel = client.channels.cache.get(ch);
		const User = await client.users.fetch(reaction.message.author.id)
		const attachment = reaction.message.attachments.first();
		const url = attachment ? attachment.url : null;
		const avatar = user.avatarURL();

		const newEmbed = new MessageEmbed()
			.setAuthor({ name: reaction.message.author.username, iconURL: avatar })
			.setColor(0x2b2d31)
			.setThumbnail(User.displayAvatarURL({ dynamic : true }))
			.setImage(`${url}`)
			//.setDescription(`This [reaction](https://discord.com/channels/${reaction.message.guildId}/${reaction.message.channelId}/${reaction.message.id}) has gained a lot of atention.\n\n**Reaction info:**\nMember: <@!${reaction.message.author.id}> | ${reaction.message.author.username}#${reaction.message.author.discriminator} | ${reaction.message.author.id}\nContent: \`${reaction.message.content || "Couldn't get the content."}\`\nNumb Reactions: ${reaction.count}`)
			.setDescription(`${reaction.message.content}\n\n**Source**\n[Jump!](https://discord.com/channels/${reaction.message.guildId}/${reaction.message.channelId}/${reaction.message.id})`)
			.setFooter({ text: reaction.message.id })
			.setTimestamp()

		console.log(reaction)
		console.log("----------------------------")

		if (reaction.parcial) {
			await reaction.fetch();
		}

		if(reaction._emoji.name === "upvote" && reaction._emoji.id === "949407628348514355") {
			//if(reaction.message)
			if(reaction.count == 1) {
				channel.send({ content: `<:upvote:1090959605619757128> ${reaction.count} <#${reaction.message.channelId}>`, embeds: [newEmbed] });
			}
		} */
	},
};