const {
	CommandInteraction,
	MessageEmbed,
	MessageActionRow,
	MessageButton,
} = require("discord.js");
const EconomyChecker = require("../../../Structures/Schema/Economy_Checker");

module.exports = {
	name: "leaderboard",
	description: "Check the currency leaderboard.",
	permission: "SEND_MESSAGES",
	type: "Economy",
	usage: "`/leaderboard`",
	/**
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		const SettingsModel = require("../../../Structures/Schema/Settings");
		const is_blacklisted = await SettingsModel.findOne({
			channel: interaction.channel.id,
		});
		const emoji = "<:tedollar:987097348305997847>";
		if (is_blacklisted !== null) {
			if (!is_blacklisted.commands.includes(`leaderboard`)) {
				return interaction.reply({
					embeds: [
						new MessageEmbed().setDescription(
							`This command has been disabled in this channel.`
						),
					],
					ephemeral: true,
				});
			}
		} else if (!is_blacklisted) {
			return interaction.reply({
				embeds: [
					new MessageEmbed().setDescription(
						`This command has been disabled in this channel.`
					),
				],
				ephemeral: true,
			});
		}
		const EconomyChecker = require("../../../Structures/Schema/Economy_Checker");
		var u = await EconomyChecker.findOne({ user: interaction.user.id });
		if (!u) {
			await EconomyChecker.create({ user: interaction.user.id, balance: 0 });
		}
		await interaction.deferReply();
		var u = await EconomyChecker.find().sort("-balance");
		const array = [];
		let x = 0;
		dontAdd = false;
		u.forEach((u) => {
			if (dontAdd == false) {
				array.push(
					`#${x + 1} | <@!${u.user}> with **${u.balance}** ${emoji} tedollars.`
				);
				x++;
			}
			if (u.user == interaction.user.id)
				yes = true
			if (x == 10) dontAdd = true;
		});
		let z = 1;
		shoudStopCount = false;
		u.forEach((u) => {
			if (u.user === interaction.user.id) {
				userPlace = z;
				shoudStopCount = true;
			} else {
				if (shoudStopCount == false) {
					z++;
				}
			}
		});

		const newEmbed = new MessageEmbed()
			.setDescription(array.join("\n").toString())
			.setAuthor({ name: "Leaderboard" })
			.setColor("ff3067")
			.setFooter({ text: `Requested by ${interaction.user.tag}` })
			.setTimestamp()

		if (yes == false) {
			newEmbed.addFields({
				name: "Your Position",
				value: ` #${userPlace} | ${interaction.user} with **${userData.balance}** coins.`,
			})
		}

		await interaction.editReply({
			embeds: [newEmbed],
		});
	},
};
