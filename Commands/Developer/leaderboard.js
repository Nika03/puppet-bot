const {
  CommandInteraction,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require("discord.js");

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
    const SettingsModel = require("../../Structures/Schema/Settings");
    const is_blacklisted = await SettingsModel.findOne({
      channel: interaction.channel.id,
    });
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
    const EconomyChecker = require("../../Structures/Schema/Economy_Checker");
    const u = await EconomyChecker.find({}).sort("-balance");
    pages = 1;
    x = 0;
    function changepage() {
      if (pages === 1) {
        global.ding = 1;
      } else {
        global.ding = 0;
      }
      if (u.length === x) {
        global.dong = 1;
      } else {
        global.dong = 0;
      }
      if (ding + dong === 0) {
        global.button = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setCustomId(`Previous_Page`)
              .setLabel(`Previous Page`)
              .setStyle(`PRIMARY`)
          )
          .addComponents(
            new MessageButton()
              .setCustomId(`Next_Page`)
              .setLabel(`Next Page`)
              .setStyle(`PRIMARY`)
          );
      } else if (ding + dong === 0) {
        global.button = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setCustomId(`Previous_Page`)
              .setLabel(`Previous Page`)
              .setStyle(`PRIMARY`)
              .setDisabled(true)
          )
          .addComponents(
            new MessageButton()
              .setCustomId(`Next_Page`)
              .setLabel(`Next Page`)
              .setStyle(`PRIMARY`)
              .setDisabled(true)
          );
      } else if (ding + dong === 1) {
        if (ding === 1) {
          global.button = new MessageActionRow()
            .addComponents(
              new MessageButton()
                .setCustomId(`Previous_Page`)
                .setLabel(`Previous Page`)
                .setStyle(`PRIMARY`)
                .setDisabled(true)
            )
            .addComponents(
              new MessageButton()
                .setCustomId(`Next_Page`)
                .setLabel(`Next Page`)
                .setStyle(`PRIMARY`)
            );
        } else if (dong === 1) {
          global.button = new MessageActionRow()
            .addComponents(
              new MessageButton()
                .setCustomId(`Previous_Page`)
                .setLabel(`Previous Page`)
                .setStyle(`PRIMARY`)
            )
            .addComponents(
              new MessageButton()
                .setCustomId(`Next_Page`)
                .setLabel(`Next Page`)
                .setStyle(`PRIMARY`)
                .setDisabled(true)
            );
        }
      }
    }
    changepage();
    place = 1;
    function maxpages() {
      y = 0;
      pages = 0;
      do {
        if (u.length % 15 === 0) {
          global.max_pages = u.length / 15;
          x = 0;
        } else if ((u.length - y) / 2 < 0) {
          global.max_pages = pages;
          x = 0;
          pages = 1;
        } else {
          y = y + 15;
          pages++;
          x = 1;
        }
      } while (x === 1);
    }
    maxpages();
    function nextpage() {
      if (pages === max_pages) {
        y = u.length % 15;
        z = 0;
        global.max = y;
        global.s = y;
        global.it = true;
      } else {
        z = 0;
        global.max = 15;
      }
      global.array = [];
      do {
        global.array
          .push(`#${place} | <@!${u[x].user}> with **${u[x].balance}** <:tedollar:987097348305997847> tedollars!
`);
        x++;
        place++;
        z++;
      } while (z !== max);
      const leaderboard = array.toString().replaceAll(`,`, ``);
      global.embed = new MessageEmbed()
        .setAuthor({ name: `Leaderboard` })
        .setDescription(leaderboard)
        .setColor(`#ff3067`);
    }
    function previouspage() {
      global.array = [];
      if (global.it === true) {
        z = global.s;
        global.it = false;
        x = x - global.s;
        place = place - global.s;
      } else {
        z = 0;
        global.s = 0;
      }
      do {
        place--;
        x--;
        global.array
          .unshift(`#${place} | <@!${u[x].user}> with **${u[x].balance}** <:tedollar:987097348305997847> tedollars!
`);
        z++;
      } while (z !== 15 + global.s);
      const leaderboard = array.toString().replaceAll(`,`, ``);
      global.embed = new MessageEmbed()
        .setAuthor({ name: `Leaderboard` })
        .setDescription(leaderboard)
        .setColor(`#ff3067`);
    }
    nextpage();
    interaction.reply({ embeds: [embed], components: [button] });
    const filter = (i) => i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      time: 15000,
    });
    collector.on(`collect`, async (i) => {
      if (i.customId === `Previous_Page`) {
        i.deferUpdate();
        global.pages--;
        previouspage();
        changepage();
        interaction.editReply({ embeds: [embed], components: [button] });
      } else if (i.customId === `Next_Page`) {
        i.deferUpdate();
        global.pages++;
        nextpage();
        changepage();
        interaction.editReply({ embeds: [embed], components: [button] });
      }
    });
    collector.on(`end`, async (collected, reason, i) => {
      if (reason === `time`) {
        interaction.editReply({
          components: [
            new MessageActionRow()
              .addComponents(
                new MessageButton()
                  .setCustomId(`Previous_Page`)
                  .setLabel(`Previous Page`)
                  .setStyle(`PRIMARY`)
                  .setDisabled(true)
              )
              .addComponents(
                new MessageButton()
                  .setCustomId(`Next_Page`)
                  .setLabel(`Next Page`)
                  .setStyle(`PRIMARY`)
                  .setDisabled(true)
              ),
          ],
        });
      } else {
        interaction.editReply({
          components: [
            new MessageActionRow()
              .addComponents(
                new MessageButton()
                  .setCustomId(`Previous_Page`)
                  .setLabel(`Previous Page`)
                  .setStyle(`PRIMARY`)
                  .setDisabled(true)
              )
              .addComponents(
                new MessageButton()
                  .setCustomId(`Next_Page`)
                  .setLabel(`Next Page`)
                  .setStyle(`PRIMARY`)
                  .setDisabled(true)
              ),
          ],
        });
      }
    });
  },
};
