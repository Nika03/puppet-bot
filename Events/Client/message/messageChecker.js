const color = require("colors");
const { Message, MessageEmbed, Client } = require("discord.js");
const settingsDB = require('../../../Structures/Schema/Settings');
const getReggie = require('../../../Functions/getReggie');
const randomN = require('../../../Functions/randomN');
const checkNitro = require('../../../Functions/checkNitro');

module.exports = {
	name: "messageCreate",
	/**
	 * @param {Message} message
	 * @param {Client} client
	 */
	async execute(message, client) {
		checkNitro(message, client);
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

		// not wroking since its not a great idea <3
		/* if (message.channel.id === "1097998918756880506") { // counting (test)
			const count = await settingsDB.findOne();
			if (message.content == count.Count + 1) {
				count.Count++;
				await count.save();
				message.react("👍");
			} else {
				message.react("👎").catch("error.");
				message.channel.send({ content: `Since ${message.author} decided to break the count we are starting back again from **0**.`});
				count.Count = 0;
				count.save();
			}
		} */

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

		const EconomyChecker = require(`../../../Structures/Schema/Economy_Checker`);
		const exists = await EconomyChecker.findOne({ user: message.author.id });
		if (!exists) {
			await EconomyChecker.create({ user: message.author.id, tbalance: 0 });
		}

		const user = await EconomyChecker.findOne({ user: message.author.id });

		if (randomN()) {
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

		let i = 0;
		if (message.channel.id === "946520764297912343") { // general puppets
			const ch = "1080570881396441288"; // reggie nika
			const channel = client.channels.cache.get(ch);
			if (randomN()) {
				let resgif = getReggie();
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
			if(content.includes("reggie") || content.includes("gay rat")) {
				message.reply({ content: getReggie() }).then(msg => { msg.react("<a:gangshit:1082295022059274300>") });
			}
			if (content.includes("<@1080804873286713424>")) { // ping the bot
				message.react("<a:gangshit:1082295022059274300>");
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
