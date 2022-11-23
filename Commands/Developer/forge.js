const {
  CommandInteraction,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require("discord.js");
const UserInventory = require("../../Structures/Schema/UserInventory");

module.exports = {
  name: "forge",
  description: "Forge some items.",
  permission: "SEND_MESSAGES",
  type: "Economy",
  usage: "`Under development.`",
  options: [
    {
      name: "craft",
      description: "Craft some tools.",
      type: "STRING",
      choices: [
        {
          name: "pickaxe",
          value: "pickaxe",
        },
        {
          name: "sword",
          value: "sword",
        },
        {
          name: "axe",
          value: "axe",
        },
        {
          name: "fishing rod",
          value: "fishing rod",
        },
      ],
    },
    {
      name: "upgrade",
      description: "Upgrade your tools.",
      type: "STRING",
      choices: [
        {
          name: "pickaxe",
          value: "pickaxe",
        },
        {
          name: "sword",
          value: "sword",
        },
        {
          name: "axe",
          value: "axe",
        },
        {
          name: "fishing rod",
          value: "fishing rod",
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
        content: "This command is under development.",
        ephemeral: true,
      });
    }
    const craft = interaction.options.getString("craft");
    const upgrade = interaction.options.getString("upgrade");

    if (craft && upgrade) {
      return interaction.reply({
        content: "You cannot craft and upgrade at the same time.",
        ephemeral: true,
      });
    }
    if (!craft && !upgrade) {
      var findUser = await UserInventory.findOne({ user: interaction.user.id });
      if (!findUser) {
        await UserInventory.create({ user: interaction.user.id });
      }
      var queue = await UserInventory.findOne({ user: interaction.user.id });
      if (queue.queueSlot1.toString() !== "{}") {
        forgingSlot1 = `\`${queue.queueSlot1.item}\` is currently being crafted and stops forging in <t:${queue.queueSlot1.queueTime}:R>.`;
      } else {
        forgingSlot1 = "Not in use.";
      }
      if (queue.queueSlot2.toString() !== "{}") {
        forgingSlot2 = `\`${queue.queueSlot2.item}\` is currently being crafted and stops forging in <t:${queue.queueSlot2.queueTime}:R>.`;
      } else {
        forgingSlot2 = "Not in use.";
      }
      if (queue.queueSlot3.toString() !== "{}") {
        forgingSlot3 = `\`${queue.queueSlot3.item}\` is currently being crafted and stops forging in <t:${queue.queueSlot3.queueTime}:R>.`;
      } else {
        forgingSlot3 = "Not in use.";
      }
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setTitle(
              "Welcome to the forge! Here you can craft and upgrade your tools."
            )
            .setAuthor({
              name: "The Forge",
            })
            .setDescription(
              `Here you will see tools that are being crafted/upgraded and when they finish.

> Forging Slot 1: ${forgingSlot1}     
         
> Forging Slot 2: ${forgingSlot2}

> Forging Slot 3: ${forgingSlot3}`
            )
            .setFooter({
              text: 'You can either craft with "/forge craft [tool]" or upgrade your tool with "/forge upgrade [tool]"',
            })
            .setColor("DARK_RED"),
        ],
      });
    }
    if (craft == "pickaxe") {
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: "The Forge" })
            .setTitle(
              "Here are the pickaxes you can craft. Click the respective button to begin crafting them."
            )
            .setDescription(
              `
__Wooden Pickaxe:__
> Cost: **FREE**
> Durability: *50*
> Drop Rarity: *0.5x*
__Stone Pickaxe:__
> Cost: **450 tedollars, 25 stone, 7 oak wood**
> Durability: *125*
> Drop Rarity: *0.7x*
__Iron Pickaxe:__
> Cost: **1200 tedollars, 15 iron, 4 leather, 3 maple wood**
> Durability: *350*
> Drop Rarity: *1x*
            `
            )
            .setFooter({ text: `Requested by ${interaction.user.tag}` })
            .setTimestamp()
            .setColor("ff3067"),
        ],
        components: [
          new MessageActionRow().addComponents(
            new MessageButton()
              .setCustomId("pickaxe_previous_page")
              .setLabel("Previous Page")
              .setStyle("PRIMARY"),
            new MessageButton()
              .setCustomId("wooden_pickaxe_button")
              .setLabel("Wooden Pickaxe")
              .setStyle("SUCCESS"),
            new MessageButton()
              .setCustomId("stone_pickaxe_button")
              .setLabel("Stone Pickaxe")
              .setStyle("SUCCESS"),
            new MessageButton()
              .setCustomId("iron_pickaxe_button")
              .setLabel("Iron Pickaxe")
              .setStyle("SUCCESS"),
            new MessageButton()
              .setCustomId("pickaxe_next_page")
              .setLabel("Next Page")
              .setStyle("PRIMARY")
          ),
        ],
      });
    } else if (craft === "sword") {
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: "The Forge" })
            .setTitle(
              "Here are the swords you can craft. Click the respective button to begin crafting them."
            )
            .setDescription(
              `
__Wooden Sword:__
> Cost: 125 tedollars, 4 oak wood
> Durability: *35*
> Drop Rarity: *0.3x*
__Stone Sword:__
> Cost: **750 tedollars, 16 stone, 7 oak wood**
> Durability: *160*
> Drop Rarity: *0.5x*
__Iron Sword:__
> Cost: **1750 tedollars, 9 iron, 11 leather, 3 maple wood**
> Durability: *350*
> Drop Rarity: *1x*
            `
            )
            .setFooter({ text: `Requested by ${interaction.user.tag}` })
            .setTimestamp()
            .setColor("ff3067"),
        ],
        components: [
          new MessageActionRow().addComponents(
            new MessageButton()
              .setCustomId("sword_previous_page")
              .setLabel("Previous Page")
              .setStyle("PRIMARY"),
            new MessageButton()
              .setCustomId("wooden_sword_button")
              .setLabel("Wooden Sword")
              .setStyle("SUCCESS"),
            new MessageButton()
              .setCustomId("stone_sword_button")
              .setLabel("Stone Sword")
              .setStyle("SUCCESS"),
            new MessageButton()
              .setCustomId("iron_sword_button")
              .setLabel("Iron Sword")
              .setStyle("SUCCESS"),
            new MessageButton()
              .setCustomId("sword_next_page")
              .setLabel("Next Page")
              .setStyle("PRIMARY")
          ),
        ],
      });
    } else if (craft === "axe") {
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: "The Forge" })
            .setTitle(
              "Here are the axes you can craft. Click the respective button to begin crafting them."
            )
            .setDescription(
              `
__Wooden Axe:__
> Cost: **FREE**
> Durability: *65*
> Drop Rarity: *0.6x*
__Stone Axe:__
> Cost: **450 tedollars, 9 stone, 14 oak wood**
> Durability: *320*
> Drop Rarity: *1x*
__Iron Axe:__
> Cost: **1200 tedollars, 16 iron, 2 leather, 27 oak wood**
> Durability: *700*
> Drop Rarity: *1.4x*
            `
            )
            .setFooter({ text: `Requested by ${interaction.user.tag}` })
            .setTimestamp()
            .setColor("ff3067"),
        ],
        components: [
          new MessageActionRow().addComponents(
            new MessageButton()
              .setCustomId("axe_previous_page")
              .setLabel("Previous Page")
              .setStyle("PRIMARY"),
            new MessageButton()
              .setCustomId("wooden_axe_button")
              .setLabel("Wooden Axe")
              .setStyle("SUCCESS"),
            new MessageButton()
              .setCustomId("stone_axe_button")
              .setLabel("Stone Axe")
              .setStyle("SUCCESS"),
            new MessageButton()
              .setCustomId("iron_axe_button")
              .setLabel("Iron Axe")
              .setStyle("SUCCESS"),
            new MessageButton()
              .setCustomId("axe_next_page")
              .setLabel("Next Page")
              .setStyle("PRIMARY")
          ),
        ],
      });
    }
  },
};
