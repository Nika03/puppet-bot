const { CommandInteraction, MessageEmbed } = require("discord.js");

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
            `Here you will see tools that are being crafted/upgraded and when they finish.`
          )
          .setFooter({
            text: '"You can either craft with `/forge craft [tool]` or upgrade your tool with `/forge upgrade [tool]`"',
          }),
      ],
    });
    if (craft && craft == "pickaxe") {
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: "The Forge" })
            .setTitle(
              "Here are the pickaxes you can craft. Click the respective button to begin crafting them."
            ).setDescription(`
__Wooden Pickaxe:__
> Cost: **FREE**
> Durability: *50*
> Drop Rarity: *0.5x*
            `),
        ],
      });
    }
  },
};
