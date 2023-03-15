const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "claim-reward",
  description: "Claim rewards given to you!",
  permission: "SEND_MESSAGES",
  type: "Economy",
  usage: "`/claim-reward level [level]`",
  options: [
    {
      name: `level`,
      description: "The level of the reward you want to claim.",
      type: `STRING`,
      choices: [
        {
          name: `Level 5`,
          value: `Level 5`,
        },
        {
          name: `Level 10`,
          value: `Level 10`,
        },
        {
          name: `Level 20`,
          value: `Level 20`,
        },
        {
          name: `Level 30`,
          value: `Level 30`,
        },
        {
          name: `Level 40`,
          value: `Level 40`,
        },
        {
          name: `Level 50`,
          value: `Level 50`,
        },
        {
          name: `Level 75`,
          value: `Level 75`,
        },
        {
          name: `Level 100`,
          value: `Level 100`,
        },
      ],
    },
  ],
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
      if (!is_blacklisted.commands.includes(`claim-reward`)) {
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
    const member = await interaction.guild.members.fetch(interaction.user.id);
    const channel = interaction.guild.channels.cache.get("987794045080338452");
    const claimed = await EconomyChecker.findOne({ user: interaction.user.id });
    if (interaction.toString() === `/claim-reward level:Level 5`) {
      if (claimed.claimed_level_5 === true) {
        return interaction.reply({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: `Reward Already Claimed` })
              .setDescription(`You already claimed this reward!`)
              .setColor(`#ff3067`),
          ],
          ephemeral: true,
        });
      } else if (!member.roles.cache.has(`946524142025465868`)) {
        return interaction.reply({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: `Cannot Claim` })
              .setDescription(
                `You dont have the role needed to claim this reward! (You need the role: <@&946524142025465868>)`
              )
              .setColor(`#ff3067`),
          ],
          ephemeral: true,
        });
      } else {
        interaction.reply({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: `Reward Claimed` })
              .setDescription(
                `You have claimed the reward for the role <@&946524142025465868>! **500** <:coin:1085660357814669392> TCoins have been added to your balance.`
              )
              .setColor(`#ff3067`),
          ],
        });
        claimed.claimed_level_5 = true;
        const new_balance = claimed.tbalance + 500;
        claimed.tbalance = new_balance;
        await claimed.save();
        channel.send({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: `Reward Claimed` })
              .setDescription(
                `<@!${interaction.user.id}> has claimed the **Level 5** reward! They have gained **500** <:coin:1085660357814669392> TCoins.`
              )
              .setColor(`DARK_GOLD`)
              .setTimestamp(),
          ],
        });
      }
    } else if (interaction.toString() === `/claim-reward level:Level 10`) {
      if (claimed.claimed_level_10 === true) {
        return interaction.reply({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: `Reward Already Claimed` })
              .setDescription(`You already claimed this reward!`)
              .setColor(`#ff3067`),
          ],
          ephemeral: true,
        });
      } else if (!member.roles.cache.has(`946524226804920392`)) {
        return interaction.reply({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: `Cannot Claim` })
              .setDescription(
                `You dont have the role needed to claim this reward! (You need the role: <@&946524226804920392>)`
              )
              .setColor(`#ff3067`),
          ],
          ephemeral: true,
        });
      } else {
        interaction.reply({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: `Reward Claimed` })
              .setDescription(
                `You have claimed the reward for the role <@&946524226804920392>! **1000** <:coin:1085660357814669392> TCoins have been added to your balance.`
              )
              .setColor(`#ff3067`),
          ],
        });
        claimed.claimed_level_10 = true;
        const new_balance = claimed.tbalance + 1000;
        claimed.tbalance = new_balance;
        await claimed.save();
        channel.send({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: `Reward Claimed` })
              .setDescription(
                `<@!${interaction.user.id}> has claimed the **Level 10** reward! They have gained **1000** <:coin:1085660357814669392> TCoins.`
              )
              .setColor(`DARK_GOLD`)
              .setTimestamp(),
          ],
        });
      }
    } else if (interaction.toString() === `/claim-reward level:Level 20`) {
      if (claimed.claimed_level_20 === true) {
        return interaction.reply({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: `Reward Already Claimed` })
              .setDescription(`You already claimed this reward!`)
              .setColor(`#ff3067`),
          ],
          ephemeral: true,
        });
      } else if (!member.roles.cache.has(`946524331649937408`)) {
        return interaction.reply({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: `Cannot Claim` })
              .setDescription(
                `You dont have the role needed to claim this reward! (You need the role: <@&946524331649937408>)`
              )
              .setColor(`#ff3067`),
          ],
          ephemeral: true,
        });
      } else {
        interaction.reply({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: `Reward Claimed` })
              .setDescription(
                `You have claimed the reward for the role <@&946524331649937408>! **2000** <:coin:1085660357814669392> TCoins have been added to your balance.`
              )
              .setColor(`#ff3067`),
          ],
        });
        claimed.claimed_level_20 = true;
        const new_balance = claimed.tbalance + 2000;
        claimed.tbalance = new_balance;
        await claimed.save();
        channel.send({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: `Reward Claimed` })
              .setDescription(
                `<@!${interaction.user.id}> has claimed the **Level 20** reward! They have gained **2000** <:coin:1085660357814669392> TCoins.`
              )
              .setColor(`DARK_GOLD`)
              .setTimestamp(),
          ],
        });
      }
    } else if (interaction.toString() === `/claim-reward level:Level 30`) {
      if (claimed.claimed_level_30 === true) {
        return interaction.reply({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: `Reward Already Claimed` })
              .setDescription(`You already claimed this reward!`)
              .setColor(`#ff3067`),
          ],
          ephemeral: true,
        });
      } else if (!member.roles.cache.has(`946524414642642974`)) {
        return interaction.reply({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: `Cannot Claim` })
              .setDescription(
                `You dont have the role needed to claim this reward! (You need the role: <@&946524414642642974>)`
              )
              .setColor(`#ff3067`),
          ],
          ephemeral: true,
        });
      } else {
        interaction.reply({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: `Reward Claimed` })
              .setDescription(
                `You have claimed the reward for the role <@&946524414642642974>! **3000** <:coin:1085660357814669392> TCoins have been added to your balance.`
              )
              .setColor(`#ff3067`),
          ],
        });
        claimed.claimed_level_30 = true;
        const new_balance = claimed.tbalance + 3000;
        claimed.tbalance = new_balance;
        await claimed.save();
        channel.send({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: `Reward Claimed` })
              .setDescription(
                `<@!${interaction.user.id}> has claimed the **Level 30** reward! They have gained **3000** <:coin:1085660357814669392> TCoins.`
              )
              .setColor(`DARK_GOLD`)
              .setTimestamp(),
          ],
        });
      }
    } else if (interaction.toString() === `/claim-reward level:Level 40`) {
      if (claimed.claimed_level_40 === true) {
        return interaction.reply({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: `Reward Already Claimed` })
              .setDescription(`You already claimed this reward!`)
              .setColor(`#ff3067`),
          ],
          ephemeral: true,
        });
      } else if (!member.roles.cache.has(`946524509937238067`)) {
        return interaction.reply({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: `Cannot Claim` })
              .setDescription(
                `You dont have the role needed to claim this reward! (You need the role: <@&946524509937238067>)`
              )
              .setColor(`#ff3067`),
          ],
          ephemeral: true,
        });
      } else {
        interaction.reply({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: `Reward Claimed` })
              .setDescription(
                `You have claimed the reward for the role <@&946524509937238067>! **4000** <:coin:1085660357814669392> TCoins have been added to your balance.`
              )
              .setColor(`#ff3067`),
          ],
        });
        claimed.claimed_level_40 = true;
        const new_balance = claimed.tbalance + 4000;
        claimed.tbalance = new_balance;
        await claimed.save();
        channel.send({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: `Reward Claimed` })
              .setDescription(
                `<@!${interaction.user.id}> has claimed the **Level 40** reward! They have gained **4000** <:coin:1085660357814669392> TCoins.`
              )
              .setColor(`DARK_GOLD`)
              .setTimestamp(),
          ],
        });
      }
    } else if (interaction.toString() === `/claim-reward level:Level 50`) {
      if (claimed.claimed_level_50 === true) {
        return interaction.reply({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: `Reward Already Claimed` })
              .setDescription(`You already claimed this reward!`)
              .setColor(`#ff3067`),
          ],
          ephemeral: true,
        });
      } else if (!member.roles.cache.has(`946524586080628856`)) {
        return interaction.reply({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: `Cannot Claim` })
              .setDescription(
                `You dont have the role needed to claim this reward! (You need the role: <@&946524586080628856>)`
              )
              .setColor(`#ff3067`),
          ],
          ephemeral: true,
        });
      } else {
        interaction.reply({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: `Reward Claimed` })
              .setDescription(
                `You have claimed the reward for the role <@&946524586080628856>! **5000** <:coin:1085660357814669392> TCoins have been added to your balance.`
              )
              .setColor(`#ff3067`),
          ],
        });
        claimed.claimed_level_50 = true;
        const new_balance = claimed.tbalance + 5000;
        claimed.tbalance = new_balance;
        await claimed.save();
        channel.send({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: `Reward Claimed` })
              .setDescription(
                `<@!${interaction.user.id}> has claimed the **Level 50** reward! They have gained **5000** <:coin:1085660357814669392> TCoins.`
              )
              .setColor(`DARK_GOLD`)
              .setTimestamp(),
          ],
        });
      }
    } else if (interaction.toString() === `/claim-reward level:Level 75`) {
      if (claimed.claimed_level_75 === true) {
        return interaction.reply({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: `Reward Already Claimed` })
              .setDescription(`You already claimed this reward!`)
              .setColor(`#ff3067`),
          ],
          ephemeral: true,
        });
      } else if (!member.roles.cache.has(`946525294217547796`)) {
        return interaction.reply({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: `Cannot Claim` })
              .setDescription(
                `You dont have the role needed to claim this reward! (You need the role: <@&946525294217547796>)`
              )
              .setColor(`#ff3067`),
          ],
          ephemeral: true,
        });
      } else {
        interaction.reply({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: `Reward Claimed` })
              .setDescription(
                `You have claimed the reward for the role <&946525294217547796>! **10000** <:coin:1085660357814669392> TCoins have been added to your balance.`
              )
              .setColor(`#ff3067`),
          ],
        });
        claimed.claimed_level_75 = true;
        const new_balance = claimed.tbalance + 10000;
        claimed.tbalance = new_balance;
        await claimed.save();
        channel.send({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: `Reward Claimed` })
              .setDescription(
                `<@!${interaction.user.id}> has claimed the **Level 75** reward! They have gained **10000** <:coin:1085660357814669392> TCoins.`
              )
              .setColor(`DARK_GOLD`)
              .setTimestamp(),
          ],
        });
      }
    } else {
      if (claimed.claimed_level_100 === true) {
        return interaction.reply({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: `Reward Already Claimed` })
              .setDescription(`You already claimed this reward!`)
              .setColor(`#ff3067`),
          ],
          ephemeral: true,
        });
      } else if (!member.roles.cache.has(`946525383480721438`)) {
        return interaction.reply({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: `Cannot Claim` })
              .setDescription(
                `You dont have the role needed to claim this reward! (You need the role: <@&946525383480721438>)`
              )
              .setColor(`#ff3067`),
          ],
          ephemeral: true,
        });
      } else {
        interaction.reply({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: `Reward Claimed` })
              .setDescription(
                `You have claimed the reward for the role <&946525383480721438>! **10000** <:coin:1085660357814669392> TCoins have been added to your balance.`
              )
              .setColor(`#ff3067`),
          ],
        });
        claimed.claimed_level_100 = true;
        const new_balance = claimed.tbalance + 100000;
        claimed.tbalance = new_balance;
        await claimed.save();
        channel.send({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: `Reward Claimed` })
              .setDescription(
                `<@!${interaction.user.id}> has claimed the **Level 100** reward! They have gained **100000** <:coin:1085660357814669392> TCoins.`
              )
              .setColor(`DARK_GOLD`)
              .setTimestamp(),
          ],
        });
      }
    }
  },
};
