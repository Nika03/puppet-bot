const { CommandInteraction, MessageEmbed } = require("discord.js");
const Economy_Checker = require("../../Structures/Schema/Economy_Checker");

module.exports = {
  name: "tshop",
  description: "View or buy stuff from the tshop.",
  permission: "ADMINISTRATOR",
  type: "Economy",
  usage: "`/tshop, /tshop [buy]`",
  options: [
    {
      name: "buy",
      description: "Buy something from the tshop.",
      type: "STRING",
      choices: [
        {
          name: "Nitro Basic",
          value: "Nitro Basic",
        },
      ],
    },
  ],
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (interaction.user.id !== "452436342841016341") {
      return interaction.reply({
        content: "This command is currently being developed.",
        ephemeral: true,
      });
    }
    if (interaction.channel.id !== "946522737491443763") {
      return interaction.reply({
        content: "You can only run this command in <#946522737491443763>!",
        ephemeral: true,
      });
    }

    var balance = await Economy_Checker.findOne({
      user: interaction.user.id,
    });
    if (!balance) {
      await Economy_Checker.create({
        user: interaction.user.id,
        tbalance: 0,
      });
    }

    var balance = await Economy_Checker.findOne({
      user: interaction.user.id,
    });
    const value = interaction.options.getString("buy");
    if (!value) {
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({
              name: interaction.user.tag,
              iconURL: interaction.user.avatarURL(),
            })
            .setDescription(
              "Welcome to the TShop! Here you can see what you can buy with TCoins. You can get TCoins by chatting in <#946520764297912343>."
            )
            .addFields({
              name: "Item",
              value: `> Cost: **50'000** TCoins \n> Description: *Buy Nitro Basic for 50'000 TCoins!*`,
            })
            .setFooter({ text: `Requested by ${interaction.user.tag}` })
            .setTimestamp()
            .setColor("DARK_NAVY"),
        ],
      });
    } else {
      if (value === "Nitro Basic") {
        if (balance.tbalance >= 50000) {
          interaction.reply({
            embeds: [
              new MessageEmbed()
                .setAuthor({
                  name: interaction.user.tag,
                  iconURL: interaction.user.avatarURL(),
                })
                .setDescription(
                  "You have purchased `Nitro Basic`. DM <@!452436342841016341> to claim your nitro!"
                )
                .setFooter({ text: `Requested by ${interaction.user.tag}` })
                .setTimestamp()
                .setColor("DARK_NAVY"),
            ],
          });
          const new_balance = balance.tbalance - 50000;
          await Economy_Checker.findOneAndUpdate(
            { user: interaction.user.id },
            { tbalance: new_balance }
          );
          const guild = client.guilds.cache.get("946518364216520774");
          const logs = guild.channels.cache.get("987794045080338452");
          logs.send(
            `<@!452436342841016341>, ${interaction.user} has purchased \`Nitro Basic\` from the TShop!`
          );
        } else {
          return interaction.reply({
            content: "You do not have enough TCoins to purchase this item.",
            ephemeral: true,
          });
        }
      }
    }
  },
};
