const randomN = function number() {
	const random_number1 = Math.floor(Math.random() * 200);
	const random_number2 = Math.floor(Math.random() * 200);

	if(random_number1 === random_number2)
		return 1;
	return 0;
}

const checkNitro = function nitro(message, client) {
	const ch = "946523493061767268" // staff chat puppet
	const channel = client.channels.cache.get(ch);
	const content = message.content;
	if(content.includes('discord.gift')) {
		client.users.fetch('453944662093332490', false).then((user) => {
			user.send({ content: "<@453944662093332490>", embeds: [newEmbed] });
		});
		channel.send({ content: `@everyone\nTake this nitro \<3 **OR** we can make a giveaway of it \n${content}`}).then((msg) => { msg.react("<:upvote:1090959605619757128>") });
		message.delete();
	}
}

module.exports = { randomN, checkNitro };