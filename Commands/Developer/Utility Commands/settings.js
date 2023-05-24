const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
	name: "settings",
	description: "Change the settings you want.",
	permission: "SEND_MESSAGES",
	type: "Utility",
	usage:
		"`/settings allowed-channels [add-channel], /settings allowed-channels [remove-channel], /settings view-allowed-channels, /settings view-allowed-commands [channel], /settings allowed-commands [channel] [add-command], /settings allowed-commands [channel] [remove-command] `",
	options: [
		{
			name: `allowed-channels`,
			description: `Add or view allowed channels.`,
			type: "SUB_COMMAND",
			options: [
				{
					name: `add-channel`,
					description: `The channel to allow.`,
					type: `CHANNEL`,
					channelTypes: [`GUILD_TEXT`],
					required: false,
				},
				{
					name: `remove-channel`,
					description: `The channel to remove.`,
					type: `CHANNEL`,
					channelTypes: [`GUILD_TEXT`],
					required: false,
				},
			],
		},
		{
			name: `view-allowed-channels`,
			description: `View all allowed channels, if there are any.`,
			type: `SUB_COMMAND`,
		},
		{
			name: `view-allowed-commands`,
			description: `View all allowed commands in a certain channel, if there are any.`,
			type: `SUB_COMMAND`,
			options: [
				{
					name: `channel`,
					description: `The channel to view allowed commands.`,
					type: `CHANNEL`,
					channelTypes: [`GUILD_TEXT`],
					required: true,
				},
			],
		},
		{
			name: `allowed-commands`,
			description: `Allow a command to be executed in the channel selected.`,
			type: "SUB_COMMAND",
			options: [
				{
					name: `channel`,
					description: `The selected channel to add/remove commands.`,
					type: `CHANNEL`,
					channelTypes: [`GUILD_TEXT`],
					required: true,
				},
				{
					name: `add-command`,
					description: `The command to add.`,
					type: `STRING`,
					required: false,
				},
				{
					name: `remove-command`,
					description: `The command to remove`,
					type: `STRING`,
					required: false,
				},
			],
		},
	],
	/**
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		const commandArray = [
			`ask`,
			`balance`,
			`claim-reward`,
			`daily`,
			`help`,
			`ping`,
			`shop`,
			`staff-list`,
			`hug`,
			`kiss`,
			"search",
			"leaderboard",
			"fotd",
			"avatar",
			"streak",
			"yomama",
			"dadjoke",
		];

		const member = await interaction.guild.members.fetch(interaction.user.id);
		if (interaction.guild.id === "946518364216520774") {
			if (!member.roles.cache.has(`946525953033646130`)) { // admin role in puppets
				return interaction.reply({
					embeds: [
						new MessageEmbed()
							.setAuthor({ name: `Missing permissions` })
							.setDescription(
								`You dont have enough permissions to run this command!`
							),
					],
				});
			}
		}else if (interaction.guild.id === "752104036102176778") {
			if (!member.roles.cache.has(`1071605420218650714`)) { // dev nika server
				return interaction.reply({
					embeds: [
						new MessageEmbed()
							.setAuthor({ name: `Missing permissions` })
							.setDescription(
								`You dont have enough permissions to run this command!`
							),
					],
				});
			}
		}
		const SettingsModel = require(`../../../Structures/Schema/Settings`);
		const cta = interaction.options.getChannel("add-channel");
		if (cta) client.cta = cta.id;
		const ctr = interaction.options.getChannel("remove-channel");
		if (ctr) client.ctr = ctr.id;
		const channel = interaction.options.getChannel("channel");
		if (channel) client.channel = channel.id;
		const cota = interaction.options.getString("add-command");
		const cotr = interaction.options.getString("remove-command");
		if (
			interaction.toString() ===
			`/settings allowed-channels add-channel:${client.cta}`
		) {
			const fc = await SettingsModel.findOne({ channel: client.cta });
			if (fc)
				return interaction.reply({
					embeds: [
						new MessageEmbed()
							.setAuthor({ name: `Invalid Channel` })
							.setDescription(
								`${cta} has already been added to the allowed channels list! Use \`/settings view-allowed-channels\` to view what channels have already been added.`
							)
							.setColor("DARK_RED")
							.setFooter({ text: `Requested by ${interaction.user.tag}` })
							.setTimestamp(),
					],
				});
			await SettingsModel.create({ channel: client.cta, commands: "" });
			interaction.reply({
				embeds: [
					new MessageEmbed()
						.setAuthor({ name: "Added Channel" })
						.setDescription(
							`${cta} has been added to the allowed channels list. No commands are allowed by default. To add commands, use \`/settings allowed-commands\`.`
						)
						.setColor("DARK_GOLD")
						.setFooter({ text: `Requested by ${interaction.user.tag}` })
						.setTimestamp(),
				],
			});
		} else if (
			interaction.toString() ===
			`/settings allowed-channels remove-channel:${client.ctr}`
		) {
			const fc = await SettingsModel.findOne({ channel: client.ctr });
			if (!fc)
				return interaction.reply({
					embeds: [
						new MessageEmbed()
							.setAuthor({ name: `Invalid Channel` })
							.setDescription(
								`${ctr} cannot be removed because it isnt on the list! Use \`/settings view-allowed-channels\` to view what channels have already been added.`
							)
							.setColor("DARK_RED")
							.setFooter({ text: `Requested by ${interaction.user.tag}` })
							.setTimestamp(),
					],
				});
			await SettingsModel.deleteOne({ channel: client.ctr });
			interaction.reply({
				embeds: [
					new MessageEmbed()
						.setAuthor({ name: "Removed Channel" })
						.setDescription(
							`${ctr} has been removed from the allowed channels list. All commands will be ignored in ${ctr}.`
						)
						.setColor("DARK_GOLD")
						.setFooter({ text: `Requested by ${interaction.user.tag}` })
						.setTimestamp(),
				],
			});
		} else if (interaction.toString() === "/settings allowed-channels") {
			return interaction.reply({
				embeds: [
					new MessageEmbed()
						.setAuthor({ name: "Invalid Command" })
						.setDescription(
							"You need to specify if you want to remove or add a channel to the list!"
						)
						.setFooter({ text: `Requested by ${interaction.user.tag}` })
						.setColor("DARK_RED")
						.setTimestamp(),
				],
			});
		} else if (
			interaction.toString() ===
			`/settings allowed-commands channel:${client.channel} add-command:${cota}`
		) {
			if (!commandArray.includes(cota)) {
				return interaction.reply({
					embeds: [
						new MessageEmbed()
							.setAuthor({ name: "Invalid Command" })
							.setDescription(
								`\`${cota}\` is not a valid command. The following commands are valid: \`${commandArray
									.toString()
									.replaceAll(",", ", ")}\`.`
							)
							.setFooter({ text: `Requested by ${interaction.user.tag}` })
							.setColor("DARK_RED")
							.setTimestamp(),
					],
				});
			}
			const fc = await SettingsModel.findOne({ channel: channel.id });
			if (!fc)
				return interaction.reply({
					embeds: [
						new MessageEmbed()
							.setAuthor({ name: "Invalid Channel" })
							.setDescription(
								`${channel} is not an allowed channel. To add an allowed channel, run \`/settings allowed-channel add-channel [channel]\`.`
							)
							.setFooter({ text: `Requested by ${interaction.user.tag}` })
							.setColor("DARK_RED")
							.setTimestamp(),
					],
				});
			const alcommands = fc.commands;
			if (alcommands.includes(cota)) {
				return interaction.reply({
					embeds: [
						new MessageEmbed()
							.setAuthor({ name: "Invalid Command" })
							.setDescription(
								`\`${cota}\` is already allowed in ${channel}. To check all allowed commands in a channel, run \`/settings view-allowed-commands [channel]\`.`
							)
							.setFooter({ text: `Requested by ${interaction.user.tag}` })
							.setColor("DARK_RED")
							.setTimestamp(),
					],
				});
			}
			const updatedCommands = alcommands + ` ${cota}`;
			await SettingsModel.findOneAndUpdate(
				{ channel: channel.id },
				{ commands: updatedCommands }
			);
			return interaction.reply({
				embeds: [
					new MessageEmbed()
						.setAuthor({ name: "Command Added" })
						.setDescription(
							`\`${cota}\` is now allowed in ${channel}. To check all allowed commands in a channel, run \`/settings view-allowed-commands [channel]\`.`
						)
						.setColor("DARK_GOLD")
						.setFooter({ text: `Requested by ${interaction.user.tag}` })
						.setTimestamp(),
				],
			});
		} else if (
			interaction.toString() ===
			`/settings allowed-commands channel:${client.channel} remove-command:${cotr}`
		) {
			const fc = await SettingsModel.findOne({ channel: channel.id });
			if (!fc)
				return interaction.reply({
					embeds: [
						new MessageEmbed()
							.setAuthor({ name: "Invalid Channel" })
							.setDescription(
								`${channel} is not an allowed channel. To add an allowed channel, run \`/settings allowed-channel add-channel [channel]\`.`
							)
							.setFooter({ text: `Requested by ${interaction.user.tag}` })
							.setColor("DARK_RED")
							.setTimestamp(),
					],
				});
			const alcommands = fc.commands;
			if (!alcommands.includes(cotr)) {
				return interaction.reply({
					embeds: [
						new MessageEmbed()
							.setAuthor({ name: "Invalid Command" })
							.setDescription(
								`\`${cotr}\` cannot be removed since it hasnt been allowed yet. To check all allowed commands in a channel, run \`/settings view-allowed-commands [channel]\`.`
							)
							.setFooter({ text: `Requested by ${interaction.user.tag}` })
							.setColor("DARK_RED")
							.setTimestamp(),
					],
				});
			}
			const updatedCommands = alcommands.replace(`${cotr}`, "");
			await SettingsModel.findOneAndUpdate(
				{ channel: channel.id },
				{ commands: updatedCommands }
			);
			return interaction.reply({
				embeds: [
					new MessageEmbed()
						.setAuthor({ name: "Command Removed" })
						.setDescription(
							`\`${cotr}\` has been removed from ${channel}. To check all allowed commands in a channel, run \`/settings view-allowed-commands [channel]\`.`
						)
						.setColor("DARK_GOLD")
						.setFooter({ text: `Requested by ${interaction.user.tag}` })
						.setTimestamp(),
				],
			});
		} else if (interaction.toString() === "/settings view-allowed-channels") {
			const fc = await SettingsModel.find();
			const sc = fc.map((c) => {
				if (c.channel) {
					return `<#${c.channel}>`;
				}
			});
			return interaction.reply({
				embeds: [
					new MessageEmbed()
						.setAuthor({ name: "Allowed Channels" })
						.setDescription(
							`
These are the allowed channels:

${sc.toString().replaceAll(",", ", ")}
        `
						)
						.setColor("DARK_GOLD")
						.setFooter({ text: `Requested by ${interaction.user.tag}` })
						.setTimestamp(),
				],
			});
		} else if (
			interaction.toString() ===
			`/settings view-allowed-commands channel:${client.channel}`
		) {
			const fc = await SettingsModel.findOne({ channel: client.channel });
			if (!fc)
				return interaction.reply({
					embeds: [
						new MessageEmbed()
							.setAuthor({ name: "Allowed Commands" })
							.setDescription(
								`${channel} is not an allowed channel. Commands will be ignored.`
							)
							.setColor("DARK_GOLD")
							.setFooter({ text: `Requested by ${interaction.user.tag}` })
							.setTimestamp(),
					],
				});
			const alcommands = fc.commands;
			const cs = alcommands.charAt(0);
			if (cs === " ") {
				client.cmd = alcommands.replace(" ", "");
			} else {
				client.cmd = fc.commands;
			}
			client.alcommands = client.cmd.replaceAll(" ", ", ");
			return interaction.reply({
				embeds: [
					new MessageEmbed()
						.setAuthor({ name: "Allowed Commands" })
						.setDescription(
							`The following commands are allowed in ${channel}:
\`${client.alcommands}\`.`
						)
						.setColor("DARK_GOLD")
						.setFooter({ text: `Requested by ${interaction.user.tag}` })
						.setTimestamp(),
				],
			});
		} else {
			return interaction.reply({
				embeds: [
					new MessageEmbed()
						.setAuthor({ name: "Invalid Command" })
						.setDescription(
							`You introduced an invalid command. Check the command and try again. (\`${interaction.toString()}\`)`
						)
						.setFooter({ text: `Requested by ${interaction.user.tag}` })
						.setColor("DARK_RED")
						.setTimestamp(),
				],
			});
		}
	},
};