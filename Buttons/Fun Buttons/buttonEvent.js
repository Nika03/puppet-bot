const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const EconomyChecker = require("../../Structures/Schema/Economy_Checker.js");

module.exports = {
	id: "event_button",
	permission: "SEND_MESSAGES",

	async execute(interaction, client) {

		const user_exists = await EconomyChecker.findOne({
			user: interaction.user.id,
		});

		if (!user_exists) {
			await EconomyChecker.create({
				user: interaction.user.id,
				tbalance: 0,
				button_clicked: 1,
			});
		}

		const check_streak = await EconomyChecker.findOne({
			user: interaction.user.id,
		});

		if (check_streak.button_clicked === undefined) {
			check_streak.button_clicked = 1;
			await check_streak.save();
		}

		const coins = Math.floor(user_exists.button_clicked * 50);

		interaction.deferUpdate();
		const stoptimer = Date.now() / 1000 - client.buttontimer;
		const time = `${interaction.user.tag
			} clicked the button in ${stoptimer.toFixed(1)} seconds.`;
		interaction.message.edit({
			embeds: [
				new MessageEmbed()
					.setAuthor({ name: "Click the Button" })
					.setDescription(
						`${interaction.user} was the first one to click the button. They win... **1k + ${coins} TCoins**.`
					)
					.setColor(interaction.guild.me.displayHexColor || "DARK_RED")
					.setFooter({ text: `${time} | streak: ${user_exists.button_clicked}` }),
			],
			components: [
				new MessageActionRow().addComponents(
					new MessageButton()
						.setCustomId(`event_button`)
						.setLabel(`button`)
						.setStyle(`SUCCESS`)
						.setDisabled(true)
				),
			],
		});
		const new_streak = user_exists.button_clicked + 1;
		const new_balance = Math.floor(coins + 1000 + user_exists.tbalance);
		user_exists.tbalance = new_balance;
		user_exists.button_clicked = new_streak;
		await user_exists.save();
		client.buttonclicked = true;
	},
};
