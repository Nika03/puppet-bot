const { Message, MessageEmbed, Client } = require("discord.js");

module.exports = {
	name: "messageCreate",
	/**
	 * @param {Message} message
	 * @param {Client} client
	 */
	async execute(message, client) {
		var urlRegex =
			/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
		const guild = client.guilds.cache.get("946518364216520774"); // puppet server
		const member = guild.members.cache.get(message.author.id);
		if (
			!message.author.bot // && Math.floor(member.joinedTimestamp / 1000 + 43200) > Math.floor(Date.now() / 1000)
		) {
			if (urlRegex.test(message.toString())) {
				message.delete();
			}
		}
		if (message.channel.id === "1006613586157764659") {
			if (message.author.bot) {
				message.delete();
			} else if (
				message.toString() !== "Do you know who else suffers from dementia?"
			) {
				setTimeout(() => {
					message.delete();
				}, 100);
				try {
					const guild = client.guilds.cache.get("946518364216520774");
					const member = guild.members.cache.get(message.author.id);
					await member.timeout(
						60000,
						"Do you know who else suffers from dementia?"
					);
				} catch (e) {
					console.log(e);
				}
			}
		}
		if (message.channel.id === "1016338379836756058") {
			if (message.author.bot) {
				message.delete();
			} else if (message.toString() !== "huh") {
				setTimeout(() => {
					message.delete();
				}, 100);
				try {
					const guild = client.guilds.cache.get("946518364216520774");
					const member = guild.members.cache.get(message.author.id);
					await member.timeout(60000, "huh");
				} catch (e) {
					console.log(e);
				}
			}
		}
		if (message.author.bot) return;
		if (message.toString().includes("/")) return;

		const allowedchannels = [
			`946520764297912343`,
			`946520785764372511`,
			`946521056380858378`,
			`946522446025080903`,
			`964855357149167646`,
			`946530497255845888`,
			`946521074647048212`,
		];

		//if (!allowedchannels.includes(message.channel.id)) return;

		const random_number1 = Math.floor(Math.random() * 100);
		const random_number2 = Math.floor(Math.random() * 100);

		const EconomyChecker = require(`../../Structures/Schema/Economy_Checker`);
		const exists = await EconomyChecker.findOne({ user: message.author.id });
		if (!exists) {
			await EconomyChecker.create({ user: message.author.id, tbalance: 0 });
		}

		const user = await EconomyChecker.findOne({ user: message.author.id });

		if (random_number1 === random_number2) {
			client.random_amount = Math.floor(Math.random() * 150);
			if (client.random_amount === 0) {
				client.random_amount = 1;
			}
			message.reply({
				embeds: [
					new MessageEmbed()
						.setAuthor({
							name: `Teto Trader`,
							iconURL: `https://cdn.discordapp.com/attachments/703686629633687683/986354411037143040/teto.png`,
						})
						.setDescription(
							`Nya! I've given you **${client.random_amount}** TCoins for chatting in ${message.channel}!`
						)
						.setFooter({ text: "Burunyaa!" })
						.setColor(`ff3067`)
						.setThumbnail(
							`https://ih1.redbubble.net/image.3081807300.1669/throwpillow,small,1000x-bg,f8f8f8-c,0,200,1000,1000.jpg`
						)
						.setTimestamp(),
				],
			});

			const new_balance = user.tbalance + client.random_amount;
			await EconomyChecker.findOneAndUpdate(
				{ user: message.author.id },
				{ tbalance: new_balance }
			);
		}

		const gifs = ['https://tenor.com/view/whygena-reggie-gif-20262381', 'https://imgur.com/a/c9AyI5a', 'https://media.discordapp.net/attachments/665624930599174154/986280946166796378/B6A6A6F6-0940-4AA0-83EB-B0E0C046180C-1.gif', 'https://tenor.com/view/whygena-whygena-tentacles-reggie-reggie-the-rat-cute-rat-boy-gif-24174715', 'https://tenor.com/view/reggie-mouse-trap-gif-25221480', 'https://media.discordapp.net/attachments/473197954132475907/987137675960131614/FDXskHtVQAMsNM_.gif', 'https://tenor.com/view/meme-reggie-the-rat-berserk-skeleton-gif-25594200', 'https://tenor.com/view/dansen-whygena-reggie-gif-21008024', 'https://tenor.com/view/almic-gif-19160345'];
		const gif = Math.floor(Math.random() * gifs.length);
		const resgif = gifs[gif];

		if (message.channel.id === "946520764297912343") { // general puppets
			let random_number1 = Math.floor(Math.random() * 100);
			let random_number2 = Math.floor(Math.random() * 100);
			//random_number1 = 1;
			//random_number2 = 1;
			console.log(`Rat1 = ${random_number1}\nRat2 = ${random_number2}`);
			if (random_number1 === random_number2) {
				const ch = "1080570881396441288"; // reggie nika
				const channel = client.channels.cache.get(ch);
				channel.send({ content: resgif });
				//message.channel.send({content: resgif});
				message.reply({ content: resgif });
			}
		}
	},
};
