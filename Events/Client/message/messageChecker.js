const color = require("colors");
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
		/* if (
			!message.author.bot && Math.floor(member.joinedTimestamp / 1000 + 43200) > Math.floor(Date.now() / 1000)
		) {
			if (urlRegex.test(message.toString())) {
				message.delete();
			}
		} */
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

		if (message.channel.id === "1084207748331339837") { // gangshit chain
			if (message.author.bot) {
				message.delete();
			} else if (message.toString() !== "<a:gangshit:1082295022059274300>") {
				setTimeout(() => {
					message.delete();
				}, 100);
				try {
					const guild = client.guilds.cache.get("946518364216520774");
					const member = guild.members.cache.get(message.author.id);
					await member.timeout(60000, "gangshit <a:gangshit:1082295022059274300>");
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

		const EconomyChecker = require(`../../../Structures/Schema/Economy_Checker`);
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
							name: client.user.username,
							iconURL: client.user.avatarURL(),
						})
						.setDescription(
							`Nya! I've given you **${client.random_amount}** TCoins for chatting in ${message.channel}!`
						)
						.setFooter({ text: "Burunyaa!" })
						.setColor(message.guild.me.displayHexColor)
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

		let i = 0;
		if (message.channel.id === "946520764297912343") { // general puppets
			const ch = "1080570881396441288"; // reggie nika
			const channel = client.channels.cache.get(ch);
			let random_number1 = Math.floor(Math.random() * 150);
			let random_number2 = Math.floor(Math.random() * 150);
			//random_number1 = 1;
			//random_number2 = 1;
			//console.log(`Rat1 = ${random_number1}\nRat2 = ${random_number2}`);
			//channel.send({ content: `Rat1 = ${random_number1}\nRat2 = ${random_number2}` });
			if (random_number1 === random_number2) {
				if (message.author.id === "453944662093332490") return; // <3
				console.log(`Sent a gif to chat! ${++i}`.brightGreen);
				const newEmbed = new MessageEmbed()
					.setTitle("Gif")
					.setDescription(`Link to the replied msg: ${message.url}\nChannel: ${message.channel}\nUser: <@${message.author.id}>(${message.author.tag})`)
					//.setImage(resgif)
					.setTimestamp()
				channel.send({ content: resgif, embeds: [newEmbed] });
				message.reply({ content: resgif }).then(msg => { msg.react("<a:gangshit:1082295022059274300>") });
			}
		}

		if (message.channel.id === "946520764297912343") { // general puppets
			if (message.content === "<@570488761528352778>") { // cosmo mention
				message.react("<:cta:1086051431179616276>");
				//console.log("cosmo")
			}
		}

		if (message.channel.id === "1028745609169092689") { // application chat
			if (message.content === "@everyone\nEmail:") {
				console.log(`Added reactions to the apps msg!`.brightGreen);
				message.react("<:upvote:1090959605619757128>");
				message.react("<:downvote:1090959604323725362>");
			}
		}

	},
};
