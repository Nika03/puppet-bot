const { CommandInteraction, MessageEmbed, User } = require("discord.js");
const UserInventory = require("../../Structures/Schema/UserInventory");

module.exports = {
  name: "give-item",
  description: "Give an item to yourself or an user.",
  permission: "ADMINISTRATOR",
  type: "Economy",
  usage: "`Under Development`",
  options: [
    {
      name: "item",
      description: "The item to give.",
      type: "STRING",
      required: true,
    },
    {
      name: "user",
      description: "The user to give the item to.",
      type: "USER",
      required: true,
    },
    {
      name: "amount",
      description: "The amount to give.",
      type: "NUMBER",
      required: true,
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
    const validItems = [
      "wooden_pickaxe",
      "stone_pickaxe",
      "wood",
      "stone",
      "iron",
    ];
    const item = interaction.options.getString("item");
    const user = interaction.options.getUser("user");
    const amount = interaction.options.getNumber("amount");

    const guild = client.guilds.cache.get(interaction.guild.id);
    const member = guild.members.cache.get(user.id);
    if (!member) {
      return interaction.reply({
        content: "You cannot give items to someone that isnt in the server!",
        ephemeral: true,
      });
    }
    var findUser = await UserInventory.findOne({ user: user.id });
    if (!findUser) {
      await UserInventory.create({ user: user.id });
    }
    var findUser = await UserInventory.findOne({ user: user.id });

    if (!validItems.includes(item)) {
      return interaction.reply({
        content: `Invalid item. Items you can give: \`${validItems.join(
          ", "
        )}\`.`,
        ephemeral: true,
      });
    }
    if (item.includes("pickaxe") && amount > 1) {
      return interaction.reply({
        content: `You cannot give more than one \`${item}\`.`,
        ephemeral: true,
      });
    }

    if (item === "wooden_pickaxe") {
      itemDurability = "50";
    } else if (item === "stone_pickaxe") {
      itemDurability = "125";
    }

    if (user === interaction.user) {
      userToPing = "yourself";
    } else {
      userToPing = user;
    }

    interaction.reply({
      embeds: [
        new MessageEmbed()
          .setAuthor({ name: "Item Given" })
          .setDescription(`You have given ${userToPing} ${amount} \`${item}\`!`)
          .setColor("DARK_NAVY")
          .setFooter({ text: `Requested by ${interaction.user.tag}` })
          .setTimestamp(),
      ],
    });
    if (item.includes("pickaxe")) {
      await UserInventory.findOneAndUpdate(
        { user: user.id },
        { pickaxe: { name: item, durability: itemDurability } }
      );
    } else {
      if (item === "wood") {
        if (findUser.wood) {
          const wood = findUser.wood + amount;
          await UserInventory.findOneAndUpdate(
            { user: user.id },
            { Wood: wood }
          );
        } else {
          await UserInventory.findOneAndUpdate(
            { user: user.id },
            { Wood: amount }
          );
        }
      } else if (item === "stone") {
        if (findUser.stone) {
          const stone = findUser.stone + amount;
          await UserInventory.findOneAndUpdate(
            { user: user.id },
            { Stone: stone }
          );
        } else {
          await UserInventory.findOneAndUpdate(
            { user: user.id },
            { Stone: amount }
          );
        }
      } else if (item === "iron") {
        if (findUser.iron) {
          const iron = findUser.iron + amount;
          await UserInventory.findOneAndUpdate(
            { user: user.id },
            { Iron: iron }
          );
        } else {
          await UserInventory.findOneAndUpdate(
            { user: user.id },
            { Iron: amount }
          );
        }
      }
    }
  },
};
