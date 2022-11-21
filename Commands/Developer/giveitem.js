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
      "iron_pickaxe",
      "stone",
      "iron",
      "diamond",
      "wooden_sword",
      "stone_sword",
      "iron_pickaxe",
      "string",
      "leather",
      "wolf teeth",
      "wooden_axe",
      "stone_axe",
      "iron_axe",
      "oak wood",
      "maple wood",
      "tiger wood",
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
    } else if (item.includes("sword") && amount > 1) {
      return interaction.reply({
        content: `You cannot give more than one \`${item}\`.`,
        ephemeral: true,
      });
    } else if (item.includes("axe") && amount > 1) {
      return interaction.reply({
        content: `You cannot give more than one \`${item}\`.`,
        ephemeral: true,
      });
    }

    if (item === "wooden_pickaxe") {
      itemDurability = "50";
    } else if (item === "stone_pickaxe") {
      itemDurability = "125";
    } else if (item === "iron_pickaxe") {
      itemDurability = "350";
    }

    if (item === "wooden_sword") {
      itemDurability = "35";
    } else if (item === "stone_sword") {
      itemDurability = "160";
    } else if (item === "iron_sword") {
      itemDurability = "350";
    }

    if (item === "wooden_axe") {
      itemDurability = "65";
    } else if (item === "stone_axe") {
      itemDurability = "320";
    } else if (item === "iron_axe") {
      itemDurability = "700";
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
    } else if (item.includes("sword")) {
      await UserInventory.findOneAndUpdate(
        { user: user.id },
        { sword: { name: item, durability: itemDurability } }
      );
    } else if (item.includes("axe")) {
      await UserInventory.findOneAndUpdate(
        { user: user.id },
        { axe: { name: item, durability: itemDurability } }
      );
    }
    {
      if (item === "stone") {
        if (findUser.Stone) {
          const stone = findUser.Stone + amount;
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
        if (findUser.Iron) {
          const iron = findUser.Iron + amount;
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
      } else if (item === "diamond") {
        if (findUser.Diamond) {
          const diamond = findUser.Diamond + amount;
          await UserInventory.findOneAndUpdate(
            { user: user.id },
            { Diamond: diamond }
          );
        } else {
          await UserInventory.findOneAndUpdate(
            { user: user.id },
            { Diamond: amount }
          );
        }
      } else if (item === "string") {
        if (findUser.String) {
          const string = findUser.String + amount;
          await UserInventory.findOneAndUpdate(
            { user: user.id },
            { String: string }
          );
        } else {
          await UserInventory.findOneAndUpdate(
            { user: user.id },
            { String: amount }
          );
        }
      } else if (item === "leather") {
        if (findUser.Leather) {
          const leather = findUser.Leather + amount;
          await UserInventory.findOneAndUpdate(
            { user: user.id },
            { Leather: leather }
          );
        } else {
          await UserInventory.findOneAndUpdate(
            { user: user.id },
            { Leather: amount }
          );
        }
      } else if (item === "wolf teeth") {
        if (findUser.Wolf_Teeth) {
          const wolf_Teeth = findUser.Wolf_Teeth + amount;
          await UserInventory.findOneAndUpdate(
            { user: user.id },
            { Wolf_Teeth: wolf_Teeth }
          );
        } else {
          await UserInventory.findOneAndUpdate(
            { user: user.id },
            { Wolf_Teeth: amount }
          );
        }
      } else if (item === "oak wood") {
        if (findUser.Oak_Wood) {
          const oak_wood = findUser.Oak_Wood + amount;
          await UserInventory.findOneAndUpdate(
            { user: user.id },
            { Oak_Wood: oak_wood }
          );
        } else {
          await UserInventory.findOneAndUpdate(
            { user: user.id },
            { Oak_Wood: amount }
          );
        }
      } else if (item === "maple wood") {
        if (findUser.Maple_Wood) {
          const maple_wood = findUser.Maple_Wood + amount;
          await UserInventory.findOneAndUpdate(
            { user: user.id },
            { Maple_Wood: maple_wood }
          );
        } else {
          await UserInventory.findOneAndUpdate(
            { user: user.id },
            { Maple_Wood: amount }
          );
        }
      } else if (item === "tiger wood") {
        if (findUser.Tiger_Wood) {
          const tiger_wood = findUser.Tiger_Wood + amount;
          await UserInventory.findOneAndUpdate(
            { user: user.id },
            { Tiger_Wood: tiger_wood }
          );
        } else {
          await UserInventory.findOneAndUpdate(
            { user: user.id },
            { Tiger_Wood: amount }
          );
        }
      }
    }
  },
};
