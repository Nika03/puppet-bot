const { CommandInteraction, MessageEmbed } = require("discord.js");
const UserInventory = require("../../Structures/Schema/UserInventory");

module.exports = {
  name: "hunt",
  description: "Hunt some animals.",
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
    if (findUser.sword.name === "None") {
      return interaction.reply({
        content:
          "You do not own a sword. Run `/forge craft:sword` to get a sword.",
        ephemeral: true,
      });
    }

    const cooldown = findUser.huntingcooldown;
    if (!cooldown) {
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: "You went hunting" })
            .setDescription(
              "You decided to go hunting with your trusty sword, and will only come back with cool materials **in 15 minutes**!"
            )
            .setColor("DARK_NAVY")
            .setFooter({ text: `Requested by ${interaction.user.tag}` })
            .setTimestamp(),
        ],
      });
      await UserInventory.findOneAndUpdate(
        { user: interaction.user.id },
        { huntingcooldown: Math.floor(Date.now() / 1000) + 15 }
      );
    } else if (cooldown > Math.floor(Date.now() / 1000)) {
      return interaction.reply({
        content: `You are on cooldown! You can only claim your loot in <t:${cooldown}:R>.`,
        ephemeral: true,
      });
    } else {
      const sword = findUser.sword.name;
      swordDurability = findUser.sword.durability;
      stringLoot = 0;
      leatherLoot = 0;
      wolfteethLoot = 0;
      if (sword === "wooden_sword") {
        rewardsLootMultiplier = 0.3;
        rewardsLootEnhancement = 7;
        huntingLoot = [
          stringLoot,
          stringLoot,
          stringLoot,
          stringLoot,
          stringLoot,
        ];
        huntingLootName = ["string", "string", "string", "string", "string"];

        lootType = 1;
      } else if (sword === "stone_sword") {
        rewardsLootMultiplier = 0.5;
        rewardsLootEnhancement = 11;
        huntingLoot = [
          stringLoot,
          stringLoot,
          leatherLoot,
          stringLoot,
          leatherLoot,
        ];
        huntingLootName = ["string", "string", "leather", "string", "leather"];
        lootType = 2;
      } else if (sword === "iron_sword") {
        rewardsLootMultiplier = 1;
        rewardsLootEnhancement = 14;
        lootType = 3;
        huntingLoot = [
          stringLoot,
          leatherLoot,
          stringLoot,
          leatherLoot,
          wolfteethLoot,
        ];
        huntingLootName = [
          "string",
          "leather",
          "string",
          "leather",
          "wolf teeth",
        ];
      }
      const baseLoot = Math.floor(Math.random() * 3) + rewardsLootEnhancement;
      lootCounted = 0;
      while (lootCounted !== 5) {
        lootCounted++;
        swordDurability--;
        if (swordDurability === 0) {
          interaction.channel.send(`Your ${sword} broke!`);
          await UserInventory.findOneAndUpdate(
            { user: interaction.user.id },
            { sword: {} }
          );
          break;
        }
        multipliedLoot = (baseLoot + lootCounted) * rewardsLootMultiplier;
      }
      lootCounted = Math.floor(multipliedLoot);

      while (lootCounted !== 0) {
        const random = Math.floor(Math.random() * 300);
        if (random <= 120) {
          huntingLoot[0]++;
        } else if (random <= 140) {
          huntingLoot[1]++;
        } else if (random <= 260) {
          huntingLoot[2]++;
        } else if (random <= 290) {
          huntingLoot[3]++;
        } else if (random <= 300) {
          huntingLoot[4]++;
        }
        lootCounted--;
      }
      if (lootType === 1) {
        embedLootResponse = `You came back from hunting! You managed to bring **${
          huntingLoot[0] +
          huntingLoot[1] +
          huntingLoot[2] +
          huntingLoot[3] +
          huntingLoot[4]
        }** string.`;
      } else if (lootType === 2) {
        embedLootResponse = `You came back from hunting! You managed to bring **${
          huntingLoot[0] + huntingLoot[1] + huntingLoot[3]
        }** string and **${huntingLoot[2] + huntingLoot[4]}** leather.`;
      } else if (lootType === 3) {
        embedLootResponse = `You came back from hunting! You managed to bring **${
          huntingLoot[0] + huntingLoot[2]
        }** string, **${huntingLoot[1] + huntingLoot[3]}** leather and **${
          huntingLoot[4]
        }** wolf teeth.`;
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
      if (swordDurability !== 0) {
        findUser.sword.durability = findUser.sword.durability - 5;
      }
      newUserString = 0;
      newUserLeather = 0;
      newUserWolf_Teeth = 0;
      var counter = 0;
      huntingLootName.forEach((l) => {
        if (l === "string") {
          newUserString = newUserString + huntingLoot[counter];
        } else if (l === "leather") {
          newUserLeather = newUserLeather + huntingLoot[counter];
        } else if (l === "wolf teeth") {
          newUserWolf_Teeth = newUserWolf_Teeth + huntingLoot[counter];
        }
        counter++;
      });
      findUser.String = findUser.String + newUserString;
      findUser.Leather = findUser.Leather + newUserLeather;
      findUser.Wold_Teeth = findUser.Wold_Teeth + newUserWolf_Teeth;
      await findUser.save();
      await UserInventory.findOneAndUpdate(
        { user: interaction.user.id },
        { huntingcooldown: "" }
      );
    }
  },
};
