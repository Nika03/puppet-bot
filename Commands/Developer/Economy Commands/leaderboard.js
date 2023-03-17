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
		//const emoji = "<:tedollar:987097348305997847>";
		const emoji = "<:coin:1085660357814669392>";
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
		var userData = await EconomyChecker.findOne({ user: interaction.user.id });
		if (!userData) {
			await EconomyChecker.create({ user: interaction.user.id, tbalance: 0 });
		}
		await interaction.deferReply();
		var u = await EconomyChecker.find().sort("-tbalance");
		const array = [];
		let x = 0;
		let yes = false
		dontAdd = false;
		u.forEach((u) => {
			if (dontAdd == false) {
				array.push(
					`#${x + 1} | <@!${u.user}> with **${u.tbalance}** ${emoji} TCoins.`
				);
				x++;
			}
			if (x < 10){
				if (u.user == interaction.user.id)
					yes = true
			}
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
			.setColor(interaction.guild.me.displayHexColor || "DARK_RED")
			.setFooter({ text: `Requested by ${interaction.user.tag}` })
			.setTimestamp()

		if (yes == false) {
			newEmbed.addFields({
				name: "Your Position",
				value: ` #${userPlace} | ${interaction.user} with **${userData.tbalance}** ${emoji} TCoins.`,
			})
		}

		await interaction.editReply({
			embeds: [newEmbed],
		});
	},
};
