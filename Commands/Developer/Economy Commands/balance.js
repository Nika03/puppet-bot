const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "balance",
  description: "Shows commands related to balance.",
  permission: "SEND_MESSAGES",
  type: "Economy",
  usage:
    "`/balance view, /balance view [user], /balance give-coins [user] [amount], /balance remove-coins [user] [amount]`",
  options: [
    {
      name: `view`,
      description: "View your current balance.",
      type: "SUB_COMMAND",
      options: [
        {
          name: `user`,
          description: `View someone's balance.`,
          type: "USER",
          required: false,
        },
      ],
    },
    {
      name: `give-coins`,
      description: "Give coins to the user selected. (Staff Only.)",
      type: "SUB_COMMAND",
      options: [
        {
          name: `user`,
          description: `The user to give coins to.`,
          type: `USER`,
          required: true,
        },
        {
          name: `amount`,
          description: "The amount of coins to give.",
          type: `NUMBER`,
          required: true,
        },
      ],
    },
    {
      name: `remove-coins`,
      description: `Remove coins from the user selected. (Staff Only.)`,
      type: `SUB_COMMAND`,
      options: [
        {
          name: `user`,
          description: `The user to remove the coins from.`,
          type: `USER`,
          required: true,
        },
        {
          name: `amount`,
          description: `The amount of coins to remove.`,
          type: `NUMBER`,
          required: true,
        },
      ],
    },
  ],
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const SettingsModel = require("../../../Structures/Schema/Settings.js");
    const is_blacklisted = await SettingsModel.findOne({
      channel: interaction.channel.id,
    });
    if (is_blacklisted !== null) {
      if (!is_blacklisted.commands.includes(`balance`)) {
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

    const CommandModel = require(`../../../Structures/Schema/Command_Checker`);
    const cmdchecker = await CommandModel.findOne({
      user: interaction.user.id,
    });
    if (!cmdchecker) {
      await CommandModel.create({ user: interaction.user.id });
    }
    const usercmds = await CommandModel.findOne({ user: interaction.user.id });
    const EconomyChecker = require("../../../Structures/Schema/Economy_Checker");
    const amount = interaction.options.getNumber(`amount`);
    const what_user = interaction.options.getUser(`user`);
    const member = await interaction.guild.members.fetch(interaction.user.id);
    const user_exists = await EconomyChecker.findOne({
      user: interaction.user.id,
    });

    if (!user_exists) {
      await EconomyChecker.create({ user: interaction.user.id, tbalance: 0 });
    }
    if (what_user !== null) {
      const other_user_exists = await EconomyChecker.findOne({
        user: what_user.id,
      });
      if (!other_user_exists) {
        await EconomyChecker.create({ user: what_user.id, tbalance: 0 });
      }
    }

    const user = await EconomyChecker.findOne({ user: interaction.user.id });

    if (user.tbalance === 0) {
      global.footer = `Imagine having no tedollars, what a loser.`;
    } else if (user.tbalance < 10000) {
      global.footer = `Not enough tedollars, work more!`;
    } else if (user.tbalance < 50000) {
      global.footer = `Sounds like a good amount to me. Dont get robbed!`;
    } else {
      global.footer = `Alright, you're the Elon of Musks with that amount of tedollars...`;
    }

    if (interaction.toString().includes(`/balance view`)) {
      if (what_user === null) {
        global.whatuser = `none`;
      } else {
        global.whatuser = what_user.id;
      }
      if (interaction.toString() === `/balance view user:${whatuser}`) {
        const check_user = await EconomyChecker.findOne({ user: whatuser });
        if (user.tbalance === 0) {
          global.other_footer = `Imagine having no tedollars, what a loser.`;
        } else if (user.tbalance < 10000) {
          global.other_footer = `Let that person get some more money, one day they will get robbed...`;
        } else if (user.tbalance < 50000) {
          global.other_footer = `Would be bad if that person got robbed...`;
        } else {
          global.other_footer = `Kinda weird how none of this tedollars were stolen yet...`;
        }
        if (what_user.id === interaction.user.id) {
          interaction.reply({
            embeds: [
              new MessageEmbed()
                .setAuthor({
                  name: `${interaction.member.user.tag}`,
                  iconURL: `${interaction.member.user.avatarURL()}`,
                })
                .setColor(interaction.guild.me.displayHexColor || "DARK_RED")
                .setDescription(
                  `You currently have **${user.tbalance}** <:coin:1085660357814669392> TCoins!`
                )
                .setFooter({ text: `${footer}` }),
            ],
          });
          if (usercmds.balance_checked === undefined) {
            usercmds.balance_checked = 1;
          } else {
            usercmds.balance_checked++;
          }
          return;
        } else {
          interaction.reply({
            embeds: [
              new MessageEmbed()
                .setAuthor({
                  name: `${interaction.member.user.tag}`,
                  iconURL: `${interaction.member.user.avatarURL()}`,
                })
                .setColor(interaction.guild.me.displayHexColor || "DARK_RED")
                .setDescription(
                  `<@!${whatuser}> currently has **${check_user.tbalance}** TCoins! Why do you want to know this tho...`
                )
                .setFooter({ text: `${other_footer}` }),
            ],
          });
          if (usercmds.other_balance_checked === undefined) {
            usercmds.other_balance_checked = 1;
          } else {
            usercmds.other_balance_checked++;
          }
          return;
        }
      }
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({
              name: `${interaction.member.user.tag}`,
              iconURL: `${interaction.member.user.avatarURL()}`,
            })
            .setColor(interaction.guild.me.displayHexColor || "DARK_RED")
            .setDescription(
              `You currently have **${user.tbalance}** <:coin:1085660357814669392> TCoins!`
            )
            .setFooter({ text: `${footer}` }),
        ],
      });
      if (usercmds.balance_checked === undefined) {
        usercmds.balance_checked = 1;
        await usercmds.save();
      } else {
        usercmds.balance_checked++;
        await usercmds.save();
      }
      return;
    } else if (
      interaction.toString() ===
      `/balance give-coins user:${what_user.id} amount:${amount}`
    ) {
      if (!member.roles.cache.has(`970229987405877259`)) {
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
      const user_exists = await EconomyChecker.findOne({ user: what_user.id });
      if (!user_exists) {
        await EconomyChecker.create({ user: what_user.id, tbalance: 0 });
      }
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({
              name: `${interaction.member.user.tag}`,
              iconURL: `${interaction.member.user.avatarURL()}`,
            })
            .setColor(interaction.guild.me.displayHexColor || "DARK_RED")
            .setDescription(
              `You have given **${amount}** tedollars to <@!${what_user.id}>!`
            )
            .setFooter({ text: `What a generous person.` }),
        ],
      });
      const user_giving = await EconomyChecker.findOne({ user: what_user.id });
      const new_balance = Math.floor(user_giving.tbalance + amount);
      await EconomyChecker.findOneAndUpdate(
        { user: what_user.id },
        { tbalance: new_balance }
      );
      const othercmdchecker = await CommandModel.findOne({
        user: what_user.id,
      });
      if (!othercmdchecker) {
        await CommandModel.create({ user: what_user.id });
      }
      const otherusercmds = await CommandModel.findOne({ user: what_user.id });
      if (otherusercmds.tedollars_gotten === undefined) {
        otherusercmds.tedollars_gotten = amount;
        await otherusercmds.save();
      } else {
        const new_amount = otherusercmds.tedollars_gotten + amount;
        otherusercmds.tedollars_gotten = new_amount;
        await otherusercmds.save;
      }
      if (usercmds.tedollars_given === undefined) {
        usercmds.tedollars_given = amount;
        await usercmds.save();
      } else {
        const new_amount = usercmds.tedollars_given + amount;
        usercmds.tedollars_given = new_amount;
        await usercmds.save();
      }
    } else if (
      interaction.toString() ===
      `/balance remove-coins user:${what_user.id} amount:${amount}`
    ) {
      if (!member.roles.cache.has(`970229987405877259`)) {
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
      const user_exists = await EconomyChecker.findOne({ user: what_user.id });
      if (!user_exists) {
        await EconomyChecker.create({ user: what_user.id, tbalance: 0 });
      }
      const user = await EconomyChecker.findOne({ user: what_user.id });
      if (user.tbalance === 0) {
        interaction.reply({
          embeds: [
            new MessageEmbed()
              .setAuthor({
                name: `${interaction.member.user.tag}`,
                iconURL: `${interaction.member.user.avatarURL()}`,
              })
              .setColor(interaction.guild.me.displayHexColor || "DARK_RED")
              .setDescription(
                `You cannot remove tedollars from someone that has no tedollars.`
              )
              .setFooter({ text: `What is wrong with you?` }),
          ],
        });
      } else if (Math.floor(user.tbalance - amount) < 0) {
        interaction.reply({
          embeds: [
            new MessageEmbed()
              .setAuthor({
                name: `${interaction.member.user.tag}`,
                iconURL: `${interaction.member.user.avatarURL()}`,
              })
              .setColor(interaction.guild.me.displayHexColor || "DARK_RED")
              .setDescription(`You cannot make someone's balance negative!`)
              .setFooter({ text: `Do you want their soul too?` }),
          ],
        });
      } else {
        interaction.reply({
          embeds: [
            new MessageEmbed()
              .setAuthor({
                name: `${interaction.member.user.tag}`,
                iconURL: `${interaction.member.user.avatarURL()}`,
              })
              .setColor(interaction.guild.me.displayHexColor || "DARK_RED")
              .setDescription(
                `You have removed **${amount}** tedollars from <@!${what_user.id}>!`
              )
              .setFooter({
                text: `Might aswell take everything from that person.`,
              }),
          ],
        });
        const new_balance = user.tbalance - amount;
        await EconomyChecker.findOneAndUpdate(
          { user: what_user.id },
          { tbalance: new_balance }
        );
        const othercmdchecker = await CommandModel.findOne({
          user: what_user.id,
        });
        if (!othercmdchecker) {
          await CommandModel.create({ user: what_user.id });
        }
        const otherusercmds = await CommandModel.findOne({
          user: what_user.id,
        });
        if (otherusercmds.tedollars_taken === undefined) {
          otherusercmds.tedollars_taken = amount;
          await otherusercmds.save();
        } else {
          const new_amount = otherusercmds.tedollars_taken + amount;
          otherusercmds.tedollars_taken = new_amount;
          await otherusercmds.save();
        }
        if (usercmds.tedollars_removed === undefined) {
          usercmds.tedollars_removed = amount;
        } else {
          const new_amount = othercmdchecker.tedollars_removed + amount;
          usercmds.tedollars_removed = new_amount;
        }
      }
    }
  },
};
