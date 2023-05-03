const { CommandInteraction, MessageEmbed } = require("discord.js");
module.exports = {
  name: "ask",
  description: "Ask neco arc for money, maybe the cat likes you, or not.",
  permission: "SEND_MESSAGES",
  type: "Economy",
  usage: "`/ask`",
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const EconomyChecker = require("../../../Structures/Schema/Economy_Checker");
    const user_exists = await EconomyChecker.findOne({
      user: interaction.user.id,
    });
    const SettingsModel = require("../../../Structures/Schema/Settings.js");
    const is_blacklisted = await SettingsModel.findOne({
      channel: interaction.channel.id,
    });
    if (is_blacklisted !== null) {
      if (!is_blacklisted.commands.includes(`ask`)) {
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

    if (!user_exists) {
      await EconomyChecker.create({ user: interaction.user.id, tbalance: 0 });
    }

    const command = await EconomyChecker.findOne({ user: interaction.user.id });
    const coins = Math.floor(Math.random() * 30);
	const event = coins * 2; // ------------------------------------------------- REMOVE AT THE END OF THE EVENT!!!! --------------
    if (Math.floor(Date.now() / 1000) <= command.ask_cooldown) {
      return interaction.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: `Cooldown` })
            .setDescription(
              `You are currently on cooldown! You can only ask for money again at <t:${command.ask_cooldown}:T>.`
            )
            .setColor(interaction.guild.me.displayHexColor || "DARK_RED"),
        ],
        ephemeral: true,
      });
    }
    if (coins < 5) {
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setDescription("Honestly, its a skill issue. And a you problem.")
            .setColor(interaction.guild.me.displayHexColor || "DARK_RED")
            .setFooter({ text: `Requested by ${interaction.user.tag}` })
            .setTimestamp(),
        ],
      });
      const cooldown = Math.floor(Date.now() / 1000 + 180);
      command.ask_cooldown = cooldown;
      await command.save();
    } else {
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: `${coins} + ${event} coins earned` }) // ------------------------------------------------- REMOVE AT THE END OF THE EVENT!!!! --------------
            .setDescription(
              "You managed to get a couple coins by faking a disease. Trash human."
            )
            .setColor(interaction.guild.me.displayHexColor || "DARK_RED")
            .setFooter({ text: `Requested by ${interaction.user.tag}` })
            .setTimestamp(),
        ],
      });
      const new_balance = Math.floor(command.tbalance + coins + event); // ------------------------------------------------- REMOVE AT THE END OF THE EVENT!!!! --------------
      const cooldown = Math.floor(Date.now() / 1000 + 180);
      command.ask_cooldown = cooldown;
      command.tbalance = new_balance;
      await command.save();
    }
  },
};
