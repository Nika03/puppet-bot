const color = require("colors");
const { Client, MessageEmbed } = require("discord.js");
const RestartsModel = require("../../Structures/Schema/Restarts.js");
const CasesModel = require("../../Structures/Schema/Cases");
const UserModeration = require("../../Structures/Schema/UserModeration");

module.exports = {
	name: "ready",
	once: true,
	/**
	 * @param {Client} client
	 * @param {Guild} guild
	 */
	async execute(client) {

		const g = "946518364216520774"; //Puppet server id
		const guild = client.guilds.cache.get(g);

		// restarts???? i dont understand
		const current_restarts = await RestartsModel.findOne();
		if (!current_restarts) {
			await RestartsModel.create({
				restarts: 1,
				allguilds: client.guilds.cache.map((guild) => guild.id),
			});
			return;
		} else {
			current_restarts.restarts++;
			await current_restarts.save();
		}
		// restarts???? i dont understand

		// Ban Checker
		/* setInterval(async () => {
			const usrcases = await RestartsModel.findOne();
			const c = await CasesModel.find();
			c.forEach(async (c) => {
				if (
					c.type === "ban" &&
					c.expired === false &&
					c.time < Date.now() / 1000
				) {
					const cn = c.case;
					await CasesModel.findOneAndUpdate(
						{ case: cn },
						{
							expired: true,
							reason_for_expire: `This user has been unbanned since <t:${c.time}>`,
							staff_who_expired: "1080804873286713424",
						}
					);
					user = c.punished;
					console.log(user)
					await CasesModel.create({
						type: "unban",
						punished: user,
						case: usrcases.cases,
						pardoner: "1080804873286713424",
						reason_for_expire: "This user has been automaticly unbanned.",
						time: Math.floor(Date.now() / 1000),
					});
					try {
						guild.members.unban(user).catch(err => {
							if(err){
								console.log(err)
								console.log('Something went wrong')
								return;
							}
						});
						if (!(await UserModeration.findOne({ user: user }))) {
							await UserModeration.create({ user: user, warns: 0 });
						} else {
							await UserModeration.findOneAndUpdate({ user: user, warns: 0 });
						}
						const logs = guild.channels.cache.get("1009968902941442119");
						logs.send({
							embeds: [
								new MessageEmbed()
									.setAuthor({ name: `Case ${current_restarts.cases}` })
									.setColor("DARK_GOLD")
									.setDescription(
										`<@!${user}> (${user}) has been unbanned. This user has been unbanned due to their ban time ending.`
									)
									.setTimestamp(),
							],
						});
						usrcases.cases++;
						await usrcases.save();
					} catch (e) {
						console.log(e);
					}
				}
			});
		}, 5000); */
		// Warn Checker
		setInterval(async () => {
			const c = await CasesModel.find();
			c.forEach(async (c) => {
				if (
					c.type === "warn" &&
					c.expired === false &&
					c.time < Date.now() / 1000
				) {
					const cn = c.case;
					await CasesModel.findOneAndUpdate({ case: cn }, { expired: true });
					const member = guild.members.cache.get(c.punished);
					const id = c.punished;
					try {
						member.send({
							embeds: [
								new MessageEmbed()
									.setAuthor({ name: "Case Expired" })
									.setDescription(
										`**Case ${c.case}** has been expired. Be more careful next time and read the rules!
	  > Reason of the punishment: \`${c.reason}\`
	  > Punisher: <@!${c.punisher}> (${c.punisher})
	  
	  > Reason for expire: \`14 days have passed since case ${c.case} was made\`.
					  `
									)
									.setColor("DARK_GOLD"),
							],
						}).catch(err => { console.log(err); console.log("couln't send the dm to the member!"); });
					} catch (e) {
						console.log(e);
					}
					const logs = guild.channels.cache.get("1009968902941442119");
					logs.send({
						embeds: [
							new MessageEmbed()
								.setAuthor({ name: `Warn ${c.case} expired` })
								.setColor("DARK_GOLD")
								.setDescription(
									`Case **${c.case}** has been expired. The user punished for this warn was <@!${c.punished}>.`
								)
								.setTimestamp(),
						],
					});
					if (!(await UserModeration.findOne({ user: id }))) {
						await UserModeration.create({ user: id, warns: 0 });
					}
					userNewWarns = 0;
					const cases = await CasesModel.find();
					cases.forEach((c) => {
						if (c.type == "warn" && c.expired == true && c.punished == id) {
							userNewWarns++;
						}
					});
					await UserModeration.findOneAndUpdate(
						{ user: id },
						{ warns: userNewWarns }
					);
				}
			});
		}, 5000);
		//Verification edit message
		const rc = await Math.floor(Math.random() * 5);
		if (rc === 0) client.color = "🟥";
		if (rc === 1) client.color = "🟩";
		if (rc === 2) client.color = "🟦";
		if (rc === 3) client.color = "🟫";
		if (rc === 4) client.color = "🟧";
		if (rc === 5) client.color = "🟪";
		const channel = guild.channels.cache.get("946528426687336559");
		channel.messages.fetch("1082004543870599229").then((m) => {
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
							.setColor("DARK_RED")
							.setTimestamp(),
					],
				});
			} catch (e) {
				console.log(e);
			}
		});
		setInterval(async () => {
			const rc = await Math.floor(Math.random() * 5);
			if (rc === 0) client.color = "🟥";
			if (rc === 1) client.color = "🟩";
			if (rc === 2) client.color = "🟦";
			if (rc === 3) client.color = "🟫";
			if (rc === 4) client.color = "🟧";
			if (rc === 5) client.color = "🟪";
			const channel = guild.channels.cache.get("946528426687336559");
			channel.messages.fetch("1082004543870599229").then((m) => {
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
								.setColor("DARK_RED")
								.setTimestamp(),
						],
					});
				} catch (e) {
					console.log(e);
				}
			});
		}, 1800000);
	}
};
