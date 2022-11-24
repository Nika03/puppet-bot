const { CommandInteraction, MessageEmbed } = require("discord.js");
const UserInventory = require("../../Structures/Schema/UserInventory");

module.exports = {
  name: "chop",
  description: "Go chop some trees!",
  permission: "SEND_MESSAGES",
  type: "Economy",
  usage: "`Under Development`",
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (interaction.user.id !== "452436342841016341") {
      return interaction.reply({
        content: "This command is under development.",
        ephemeral: true,
      });
    }
    var findUser = await UserInventory.findOne({ user: interaction.user.id });
    if (!findUser) {
      await UserInventory.create({ user: interaction.user.id });
    }
    var findUser = await UserInventory.findOne({ user: interaction.user.id });
    const axe = findUser.axe.name;
    if (axe === "None") {
      return interaction.reply({
        content:
          'You do not own an axe. Run `/forge craft:axe` to get an axe."',
      });
    }
    const cooldown = findUser.choppingcooldown;
    if (!cooldown) {
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: "You went chopping" })
            .setDescription(
              "You started chopping some wood, and will only come back with the results **in 15 minutes**! After all, wood is getting rare to find..."
            )
            .setColor("DARK_NAVY")
            .setFooter({ text: `Requested by ${interaction.user.tag}` })
            .setTimestamp(),
        ],
      });
      await UserInventory.findOneAndUpdate(
        { user: interaction.user.id },
        { choppingcooldown: Math.floor(Date.now() / 1000) + 15 }
      );
    } else if (cooldown > Math.floor(Date.now() / 1000)) {
      return interaction.reply({
        content: `You are on cooldown! You can only claim your wood in <t:${cooldown}:R>.`,
        ephemeral: true,
      });
    } else {
      axeDurability = findUser.axe.durability;
      oakLoot = 0;
      mapleLoot = 0;
      tigerLoot = 0;
      rubyLoot = 0;
      if (axe === "wooden_axe") {
        rewardsLootMultiplier = 0.6;
        rewardsLootEnhancement = 9;
        foragingLoot = [oakLoot, oakLoot, oakLoot, oakLoot, mapleLoot];
        foragingLootName = ["oak", "oak", "oak", "oak", "maple"];
        lootType = 1;
      } else if (axe === "stone_axe") {
        rewardsLootMultiplier = 1;
        rewardsLootEnhancement = 14;
        foragingLoot = [oakLoot, oakLoot, oakLoot, mapleLoot, mapleLoot];
        foragingLootName = ["oak", "oak", "oak", "maple", "maple"];
        lootType = 2;
      } else if (axe === "iron_pickaxe") {
        rewardsLootMultiplier = 1.4;
        rewardsLootEnhancement = 21;
        lootType = 3;
        foragingLoot = [oakLoot, oakLoot, mapleLoot, mapleLoot, tigerLoot];
        foragingLootName = ["oak", "oak", "maple", "maple", "tiger"];
      }
      const baseLoot = Math.floor(Math.random() * 3) + rewardsLootEnhancement;
      lootCounted = 0;
      while (lootCounted !== 5) {
        lootCounted++;
        axeDurability--;
        if (axeDurability === 0) {
          interaction.channel.send(`Your ${axe} broke!`);
          await UserInventory.findOneAndUpdate(
            { user: interaction.user.id },
            { axe: {} }
          );
          break;
        }
        multipliedLoot = (baseLoot + lootCounted) * rewardsLootMultiplier;
      }
      lootCounted = Math.floor(multipliedLoot);

      while (lootCounted !== 0) {
        const random = Math.floor(Math.random() * 300);
        if (random <= 120) {
          foragingLoot[0]++;
        } else if (random <= 140) {
          foragingLoot[1]++;
        } else if (random <= 260) {
          foragingLoot[2]++;
        } else if (random <= 290) {
          foragingLoot[3]++;
        } else if (random <= 300) {
          foragingLoot[4]++;
        }
        lootCounted--;
      }

      if (lootType === 1) {
        embedLootResponse = `You came back from chopping trees! You managed to bring **${
          foragingLoot[0] + foragingLoot[1] + foragingLoot[2] + foragingLoot[3]
        }** oak wood, and **${foragingLoot[4]}** maple wood.`;
      } else if (lootType === 2) {
        embedLootResponse = `You came back from chopping trees! You managed to bring **${
          foragingLoot[0] + foragingLoot[1] + foragingLoot[2]
        }** oak wood, and **${foragingLoot[3] + foragingLoot[4]}** maple wood.`;
      } else if (lootType === 3) {
        embedLootResponse = `You came back from chopping trees!! You managed to bring **${
          foragingLoot[0] + foragingLoot[1]
        }** oak wood, **${
          foragingLoot[2] + foragingLoot[3]
        }** maple wood, and **${foragingLoot[4]}** tiger wood.`;
      }

      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: `${interaction.user.username}'s Loot` })
            .setDescription(`${embedLootResponse}`)
            .setFooter({ text: `Requested by ${interaction.user.tag}` })
            .setTimestamp()
            .setColor("NAVY"),
        ],
      });

      if (axeDurability !== 0) {
        findUser.axe.durability = findUser.axe.durability - 5;
      }

      newUserOakWood = 0;
      newUserMapleWood = 0;
      newUserTigerWood = 0;
      var counter = 0;
      foragingLootName.forEach((l) => {
        if (l === "oak") {
          newUserOakWood = newUserOakWood + foragingLoot[counter];
        } else if (l === "maple") {
          newUserMapleWood = newUserMapleWood + foragingLoot[counter];
        } else if (l === "tiger") {
          newUserTigerWood = newUserTigerWood + foragingLoot[counter];
        }
        counter++;
      });

      findUser.Oak_Wood = findUser.Oak_Wood + newUserOakWood;
      findUser.Maple_Wood = findUser.Maple_Wood + newUserMapleWood;
      findUser.Tiger_Wood = findUser.Tiger_Wood + newUserTigerWood;
      await findUser.save();

      await UserInventory.findOneAndUpdate(
        { user: interaction.user.id },
        { choppingcooldown: "" }
      );
    }
  },
};
