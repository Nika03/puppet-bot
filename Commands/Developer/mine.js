const { CommandInteraction, MessageEmbed, User } = require("discord.js");
const UserInventory = require("../../Structures/Schema/UserInventory");

module.exports = {
  name: "mine",
  description: "Mine some items.",
  permission: "SEND_MESSAGES",
  type: "Economy",
  usage: "`Under Development`",
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    //if (interaction.user.id !== "452436342841016341") {
    //  return interaction.reply({
    //    content: "This command is under development.",
    //    ephemeral: true,
    //  });
    //}
    var findUser = await UserInventory.findOne({ user: interaction.user.id });
    if (!findUser) {
      await UserInventory.create({ user: interaction.user.id });
    }
    var findUser = await UserInventory.findOne({ user: interaction.user.id });
    if (findUser.pickaxe.toString() === "{}") {
      return interaction.reply({
        content:
          "You do not own a pickaxe. Run `/forge craft:pickaxe` to get a pickaxe.",
        ephemeral: true,
      });
    }

    const cooldown = findUser.miningcooldown;
    if (!cooldown) {
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: "You went mining" })
            .setDescription(
              "You started mining with your trusty pickaxe, and will only come back with suprises **in 15 minutes**!"
            )
            .setColor("DARK_NAVY")
            .setFooter({ text: `Requested by ${interaction.user.tag}` })
            .setTimestamp(),
        ],
      });
      await UserInventory.findOneAndUpdate(
        { user: interaction.user.id },
        { miningcooldown: Math.floor(Date.now() / 1000) + 15 }
      );
    } else if (cooldown > Math.floor(Date.now() / 1000)) {
      return interaction.reply({
        content: `You are on cooldown! You can only claim your findings in <t:${cooldown}:R>.`,
        ephemeral: true,
      });
    } else {
      const pickaxe = findUser.pickaxe.name;
      const durability = findUser.pickaxe.durability;
      stoneLoot = 0;
      ironLoot = 0;
      diamondLoot = 0;
      rubyLoot = 0;
      if (pickaxe === "wooden_pickaxe") {
        rewardsLootMultiplier = 0.5;
        rewardsLootEnhancement = 5;
        mineableLoot = [stoneLoot, "stone", "stone", "stone", "stone"];
      } else if (pickaxe === "stone_pickaxe") {
        rewardsLootMultiplier = 0.7;
        rewardsLootEnhancement = 9;
        mineableLoot = ["stone", "iron", "iron", "stone", "diamond"];
      } else if (pickaxe === "iron_pickaxe") {
        rewardsLootMultiplier = 1;
        rewardsLootEnhancement = 14;
        mineableLoot = [stoneLoot, "iron", "iron", "diamond", "ruby"];
      }
      const baseLoot = Math.floor(Math.random() * 3) + rewardsLootEnhancement;
      lootCounted = 0;
      while (lootCounted !== 5) {
        lootCounted++;
        if (durability === 0) break;
        multipliedLoot = (baseLoot + lootCounted) * rewardsLootMultiplier;
      }
      lootCounted = multipliedLoot;

      while (lootCounted !== 0) {
        console.log(mineableLoot[0], mineableLoot[0]);
      }
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: `${interaction.user.tag}'s rewards` })
            .setDescription("rewards!"),
        ],
      });
    }
  },
};
