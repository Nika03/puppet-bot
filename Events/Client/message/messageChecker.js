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

		function getGif() {
			const gifs = ['https://tenor.com/view/whygena-reggie-gif-20262381', 'https://imgur.com/a/c9AyI5a', 'https://media.discordapp.net/attachments/665624930599174154/986280946166796378/B6A6A6F6-0940-4AA0-83EB-B0E0C046180C-1.gif', 'https://tenor.com/view/whygena-whygena-tentacles-reggie-reggie-the-rat-cute-rat-boy-gif-24174715', 'https://tenor.com/view/reggie-mouse-trap-gif-25221480', 'https://media.discordapp.net/attachments/473197954132475907/987137675960131614/FDXskHtVQAMsNM_.gif', 'https://tenor.com/view/meme-reggie-the-rat-berserk-skeleton-gif-25594200', 'https://tenor.com/view/dansen-whygena-reggie-gif-21008024', 'https://tenor.com/view/almic-gif-19160345', 'https://images-ext-1.discordapp.net/external/OAlx2gUxmNNLng_B2lz-5l2KBw4_LWZxWlb27PWlGh8/https/media.tenor.com/VYmHeuBAHjwAAAPo/reggie-whygena.mp4', 'https://images-ext-1.discordapp.net/external/WUQQ5Gb-bj_9NFuQ1YB8adan0rAhN91UwsW1ISeDUoY/https/media.tenor.com/_ncTkhanfekAAAPo/reggie-whygena.mp4', 'https://images-ext-1.discordapp.net/external/CGjCatiWXWoNwj_RlH2A3q-6FcVTUZDq49f0GJ9KLEQ/https/media.tenor.com/WUNY9nJpdoEAAAPo/reggie-whygena.mp4', 'https://images-ext-2.discordapp.net/external/0jJacKOvAsKTFrVeP_giR_aWNpE7vUb_l-OUSdFag5A/https/media.tenor.com/SuOErpUay3oAAAPo/reggie-whygena.mp4', 'https://images-ext-1.discordapp.net/external/8gX5a3SMKxwJCejmqgfX0SkEUfDmPv8e05NP-zwhc3Y/https/i.kym-cdn.com/photos/images/original/001/760/738/ad8.gif?width=936&height=702', 'https://images-ext-1.discordapp.net/external/cGrA7Z9D3Mr8Rl_Y6359XBrgyswFdKumaGz35T_TlD4/https/i.kym-cdn.com/photos/images/newsfeed/001/419/859/baa.gif', 'https://tenor.com/view/reggie-whygena-rat-mouse-yawn-gif-6163606526851292732', 'https://tenor.com/view/reggie-whygena-rat-sleeping-bed-gif-18336145926028492265', 'https://tenor.com/view/reggie-whygena-rat-waking-up-wake-up-gif-6432082508319913601', 'https://tenor.com/view/reggie-whygena-rat-sigh-mouse-gif-5396302663880723322', 'https://i.kym-cdn.com/photos/images/original/001/760/738/ad8.gif' ];
			const gif = Math.floor(Math.random() * gifs.length);
			const resgif = gifs[gif];
			return resgif;
		}
		const gifs = ['https://tenor.com/view/whygena-reggie-gif-20262381', 'https://imgur.com/a/c9AyI5a', 'https://media.discordapp.net/attachments/665624930599174154/986280946166796378/B6A6A6F6-0940-4AA0-83EB-B0E0C046180C-1.gif', 'https://tenor.com/view/whygena-whygena-tentacles-reggie-reggie-the-rat-cute-rat-boy-gif-24174715', 'https://tenor.com/view/reggie-mouse-trap-gif-25221480', 'https://media.discordapp.net/attachments/473197954132475907/987137675960131614/FDXskHtVQAMsNM_.gif', 'https://tenor.com/view/meme-reggie-the-rat-berserk-skeleton-gif-25594200', 'https://tenor.com/view/dansen-whygena-reggie-gif-21008024', 'https://tenor.com/view/almic-gif-19160345', 'https://images-ext-1.discordapp.net/external/OAlx2gUxmNNLng_B2lz-5l2KBw4_LWZxWlb27PWlGh8/https/media.tenor.com/VYmHeuBAHjwAAAPo/reggie-whygena.mp4', 'https://images-ext-1.discordapp.net/external/WUQQ5Gb-bj_9NFuQ1YB8adan0rAhN91UwsW1ISeDUoY/https/media.tenor.com/_ncTkhanfekAAAPo/reggie-whygena.mp4', 'https://images-ext-1.discordapp.net/external/CGjCatiWXWoNwj_RlH2A3q-6FcVTUZDq49f0GJ9KLEQ/https/media.tenor.com/WUNY9nJpdoEAAAPo/reggie-whygena.mp4', 'https://images-ext-2.discordapp.net/external/0jJacKOvAsKTFrVeP_giR_aWNpE7vUb_l-OUSdFag5A/https/media.tenor.com/SuOErpUay3oAAAPo/reggie-whygena.mp4', 'https://images-ext-1.discordapp.net/external/8gX5a3SMKxwJCejmqgfX0SkEUfDmPv8e05NP-zwhc3Y/https/i.kym-cdn.com/photos/images/original/001/760/738/ad8.gif?width=936&height=702', 'https://images-ext-1.discordapp.net/external/cGrA7Z9D3Mr8Rl_Y6359XBrgyswFdKumaGz35T_TlD4/https/i.kym-cdn.com/photos/images/newsfeed/001/419/859/baa.gif', 'https://tenor.com/view/reggie-whygena-rat-mouse-yawn-gif-6163606526851292732', 'https://tenor.com/view/reggie-whygena-rat-sleeping-bed-gif-18336145926028492265', 'https://tenor.com/view/reggie-whygena-rat-waking-up-wake-up-gif-6432082508319913601', 'https://tenor.com/view/reggie-whygena-rat-sigh-mouse-gif-5396302663880723322', 'https://i.kym-cdn.com/photos/images/original/001/760/738/ad8.gif' ];
		const gif = Math.floor(Math.random() * gifs.length);
		const resgif = gifs[gif];

		let i = 0;
		if (message.channel.id === "946520764297912343") { // general puppets
			const ch = "1080570881396441288"; // reggie nika
			const channel = client.channels.cache.get(ch);
			let random_number1 = Math.floor(Math.random() * 200);
			let random_number2 = Math.floor(Math.random() * 200);
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
			const content = message.content.toLocaleLowerCase();
			if (content.includes("<@570488761528352778")) { // cosmo mention
				message.react("<:cta:1086051431179616276>");
				//console.log("cosmo")
			}
			// I get dms if a member with "Moderated Nickname xxxx" sends a msg in #general
			if (message.member.nickname !== null) {
				if (message.member.nickname.includes("Moderated Nickname")) {
					const name = message.author.username;
					const tag = `${message.author.username}#${message.author.discriminator} | ${message.author.id}`
					const avatar = message.member.user.avatarURL()
					const content = message.content;
					const id = message.id;
					const URL = `https://discord.com/channels/${message.guildId}/${message.channelId}/${message.id}`;

					const newEmbed = new MessageEmbed()
						.setTitle(name)
						.setAuthor({ name: tag, iconURL: avatar, url: URL })
						.setDescription(`\`\`\`${content}\`\`\`\n\n[Jump!](${URL})`)
						.setColor(0x2b2d31)
						.setFooter({ text: id })
						.setTimestamp()

					client.users.fetch('453944662093332490', false).then((user) => {
						user.send({ content: "<@453944662093332490>", embeds: [newEmbed] });
					});
				}
			}
		}

		// funny msgs and replys
		if (message.channel.id === "946520764297912343") { // general puppet
			// check if is mod
			let mod = false;
			if (message.member.roles.cache.has("970229987405877259")) mod = true;
			// check if is admin
			let admin = false;
			if (message.member.roles.cache.has("946525953033646130")) admin = true;

			const channel = message.channel;
			const content = message.content.toLocaleLowerCase();

			if (content.includes("fuck reggie")) {
				channel.send(`<a:gangshit:1082295022059274300> ${message.author} <a:gangshit:1082295022059274300>`).then(msg => { msg.react("<a:gangshit:1082295022059274300>") });
			}
			if (content.includes("change my name")) {
				channel.send(`we won't change your name if you ask for it unless it's a moderated nickname, you need to earn the perks yourself`);
			}
			if (content.includes("@everyone")) {
				if (!(mod || admin)) {
					channel.send("Why would you even try that?")
				}
			}
			if(content.includes("reggie gif")) {
				message.reply({ content: getGif() }).then(msg => { msg.react("<a:gangshit:1082295022059274300>") });
			}
		}

		if (message.channel.id === "1028745609169092689") { // application chat
			const content = message.content.toLocaleLowerCase();
			if (content.includes("@everyone\nEmail:")) {
				console.log(`Added reactions to the apps msg!`.brightGreen);
				message.react("<:upvote:1090959605619757128>");
				message.react("<:downvote:1090959604323725362>");
			}
		}

	},
};
