const {
  CommandInteraction,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require("discord.js");

module.exports = {
  name: "shop",
  description: "Shows commands related to the shop.",
  permission: "ADMINISTRATOR",
  type: "Economy",
  usage:
    "`/shop view, /shop buy [item], /shop add-item [name] [description] [price] [role], /shop add-item [name] [description] [price] [role] [stock], /shop remove-item [name]`",
  options: [
    {
      name: `view`,
      description: `Shows what is currently for sale in the shop!`,
      type: `SUB_COMMAND`,
    },
    {
      name: `buy`,
      description: `Buy something from the shop.`,
      type: `SUB_COMMAND`,
      options: [
        {
          name: `item`,
          description: `The item you want to buy.`,
          type: `STRING`,
          required: true,
        },
      ],
    },
    {
      name: `add-item`,
      description: `Adds an item to the shop. (Admin Only)`,
      type: `SUB_COMMAND`,
      options: [
        {
          name: `name`,
          description: `The name of the item to add.`,
          type: `STRING`,
          required: true,
        },
        {
          name: `description`,
          description: `The description of the item.`,
          type: `STRING`,
          required: true,
        },
        {
          name: `price`,
          description: `The price of the item.`,
          type: `NUMBER`,
          required: true,
        },
        {
          name: `role`,
          description: `Add a role to the shop.`,
          type: `ROLE`,
          required: true,
        },
        {
          name: `stock`,
          description: `How much is available before removing the item from the shop. (Optional)`,
          type: `NUMBER`,
          required: false,
        },
      ],
    },
    {
      name: `remove-item`,
      description: `Removes an item from the shop. (Admin Only)`,
      type: `SUB_COMMAND`,
      options: [
        {
          name: `name`,
          description: `The name of the item to remove.`,
          type: `STRING`,
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
    const ShopItems = require("../../Structures/Schema/Shop_Items");
    const EconomyChecker = require("../../Structures/Schema/Economy_Checker");

    const SettingsModel = require("../../Structures/Schema/Settings.js");
    const is_blacklisted = await SettingsModel.findOne({
      channel: interaction.channel.id,
    });
    if (is_blacklisted) {
      if (!is_blacklisted.commands.includes(`shop`)) {
        return interaction.reply({
          embeds: [
            new MessageEmbed().setDescription(
              `This command has been disabled in this channel.`
            ),
          ],
          ephemeral: true,
        });
      }
    } else {
      if (!is_blacklisted) {
      } else {
        return interaction.reply({
          embeds: [
            new MessageEmbed().setDescription(
              `This command has been disabled in this channel.`
            ),
          ],
          ephemeral: true,
        });
      }
    }

    const name = interaction.options.getString("name");
    const description = interaction.options.getString("description");
    const price = interaction.options.getNumber("price");
    const item = interaction.options.getString("item");

    if (
      interaction
        .toString()
        .includes(
          `/shop add-item name:${name} description:${description} price:${price}`
        )
    ) {
      const stock = interaction.options.getNumber("stock");
      const role = interaction.options.getRole("role");
      const fi = await ShopItems.findOne({ name: name });
      if (fi) {
        return interaction.reply({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: "Invalid Item" })
              .setDescription(`\`${name}\` has already been added to the shop.`)
              .setColor("DARK_RED")
              .setFooter({ text: `Requested by ${interaction.user.tag}` })
              .setTimestamp(),
          ],
        });
      }
      if (role && stock) {
        await ShopItems.create({
          name: name,
          description: description,
          price: price,
          role: role.id,
          stock: stock,
        });
        interaction.reply({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: "Item Added" })
              .setDescription(
                `\`${name}\` has been added to the shop. It costs **${price}** tedollars, has **${stock}** in stock, and gives the role ${role}. It has the following description: \`${description}\`.`
              )
              .setColor("GREEN")
              .setFooter({ text: `Requested by ${interaction.user.tag}` })
              .setTimestamp(),
          ],
        });
      } else if (role && !stock) {
        await ShopItems.create({
          name: name,
          description: description,
          price: price,
          role: role.id,
        });
        interaction.reply({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: "Item Added" })
              .setDescription(
                `\`${name}\` has been added to the shop. It costs **${price}** tedollars and gives the role ${role}. It has the following description: \`${description}\`.`
              )
              .setColor("GREEN")
              .setFooter({ text: `Requested by ${interaction.user.tag}` })
              .setTimestamp(),
          ],
        });
      } else if (!role && stock) {
        await ShopItems.create({
          name: name,
          description: description,
          price: price,
          stock: stock,
        });
        interaction.reply({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: "Item Added" })
              .setDescription(
                `\`${name}\` has been added to the shop. It costs **${price}** tedollars, has **${stock}** in stock. It has the following description: \`${description}\`.`
              )
              .setColor("GREEN")
              .setFooter({ text: `Requested by ${interaction.user.tag}` })
              .setTimestamp(),
          ],
        });
      } else {
        await ShopItems.create({
          name: name,
          description: description,
          price: price,
        });
        interaction.reply({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: "Item Added" })
              .setDescription(
                `\`${name}\` has been added to the shop and it costs **${price}** tedollars. It has the following description: \`${description}\`.`
              )
              .setColor("GREEN")
              .setFooter({ text: `Requested by ${interaction.user.tag}` })
              .setTimestamp(),
          ],
        });
      }
    } else if (interaction.toString() === `/shop remove-item name:${name}`) {
      const fi = await ShopItems.findOne({ name: name });
      if (!fi) {
        return interaction.reply({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: "Invalid Item" })
              .setDescription(
                `\`${name}\` cannot be removed since it does not exist.`
              )
              .setFooter({ text: `Requested by ${interaction.user.tag}` })
              .setColor("DARK_RED")
              .setTimestamp(),
          ],
        });
      }
      if (fi.stock) client.hs = fi.stock;
      if (fi.role) client.hr = fi.role;
      if (client.hs && client.hr) {
        client.embed = new MessageEmbed()
          .setAuthor({ name: "Item Deleted" })
          .setDescription(
            `\`${fi.name}\` has been deleted. It costed **${fi.price}** tedollars, it had **${fi.stock}** in stock and it gave the role <@&${fi.role}>. It had the following description: \`${fi.description}\`.`
          )
          .setFooter({ text: `Requested by ${interaction.user.tag}` })
          .setColor("GREEN")
          .setTimestamp();
      } else if (client.hs && !client.hr) {
        client.embed = new MessageEmbed()
          .setAuthor({ name: "Item Deleted" })
          .setDescription(
            `\`${fi.name}\` has been deleted. It costed **${fi.price}** tedollars and it had **${fi.stock}** in stock. It had the following description: \`${fi.description}\`.`
          )
          .setFooter({ text: `Requested by ${interaction.user.tag}` })
          .setColor("GREEN")
          .setTimestamp();
      } else if (!client.hs && client.hr) {
        client.embed = new MessageEmbed()
          .setAuthor({ name: "Item Deleted" })
          .setDescription(
            `\`${fi.name}\` has been deleted. It costed **${fi.price}** tedollars, and it gave the role <@&${fi.role}>. It had the following description: \`${fi.description}\`.`
          )
          .setFooter({ text: `Requested by ${interaction.user.tag}` })
          .setColor("GREEN")
          .setTimestamp();
      } else {
        client.embed = new MessageEmbed()
          .setAuthor({ name: "Item Deleted" })
          .setDescription(
            `\`${fi.name}\` has been deleted and it costed **${fi.price}** tedollars. It had the following description: \`${fi.description}\`.`
          )
          .setFooter({ text: `Requested by ${interaction.user.tag}` })
          .setColor("GREEN")
          .setTimestamp();
      }
      await ShopItems.findOneAndDelete({ name: name });
      interaction.reply({ embeds: [client.embed] });
    } else if (interaction.toString() === "/shop view") {
      const fi = await ShopItems.find();
      x = 0;
      pages = 1;
      do {
        if (x === 3 * pages) {
          pages++;
          const name = fi[x].name;
          await ShopItems.findOneAndUpdate({ name: name }, { page: pages });
          x++;
        } else {
          const name = fi[x].name;
          await ShopItems.findOneAndUpdate({ name: name }, { page: pages });
          x++;
        }
      } while (fi.length !== x);
      async function cp() {
        const fi = await ShopItems.find();
        client.fs = fi.map((c) => {
          if (curp === c.page) {
            if (c.role) {
              client.role = `> **Contains:** <@&${c.role}>`;
            } else {
              client.stock = "";
            }
            if (c.stock) {
              client.stock = `> **Stock Remaining:** \`${c.stock}\``;
            } else {
              client.stock = "";
            }
            return `
  - __${c.name}__ for **${c.price}** <:tedollar:987097348305997847> tedollars!
  > **Description:** *${c.description}*
  ${client.role}
  ${client.stock}
            `;
          }
        });
        if (curp === 1) {
          client.state1 = true;
        } else {
          client.state1 = false;
        }
        if (curp === pages) {
          client.state2 = true;
        } else {
          client.state2 = false;
        }
        client.button = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setCustomId(`Previous_Page`)
              .setLabel(`Previous Page`)
              .setStyle(`PRIMARY`)
              .setDisabled(client.state1)
          )
          .addComponents(
            new MessageButton()
              .setCustomId(`Next_Page`)
              .setLabel(`Next Page`)
              .setStyle(`PRIMARY`)
              .setDisabled(client.state2)
          );
      }
      curp = 1;
      await cp();
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setDescription(client.fs.toString().replaceAll(",", ""))
            .setAuthor({ name: "Teto Shop" })
            .setFooter({ text: `Requested by ${interaction.user.tag}` })
            .setTimestamp()
            .setColor("ff3067")
            .setThumbnail(
              `https://d.furaffinity.net/art/vupiqueen/1655236864/1655236864.vupiqueen_fqx0vb5x0ain_mn.png`
            ),
        ],
        components: [client.button],
      });
      const filter = (i) => i.user.id === interaction.user.id;
      const collector = interaction.channel.createMessageComponentCollector({
        filter,
        time: 15000,
      });
      collector.on(`collect`, async (i) => {
        if (i.customId === `Previous_Page`) {
          i.deferUpdate();
          curp--;
          await cp();
          interaction.editReply({
            embeds: [
              new MessageEmbed()
                .setDescription(client.fs.toString().replaceAll(",", ""))
                .setAuthor({ name: "Teto Shop" })
                .setFooter({ text: `Requested by ${interaction.user.tag}` })
                .setTimestamp()
                .setColor("ff3067")
                .setThumbnail(
                  `https://d.furaffinity.net/art/vupiqueen/1655236864/1655236864.vupiqueen_fqx0vb5x0ain_mn.png`
                ),
            ],
            components: [client.button],
          });
        } else if (i.customId === `Next_Page`) {
          i.deferUpdate();
          curp++;
          await cp();
          interaction.editReply({
            embeds: [
              new MessageEmbed()
                .setDescription(client.fs.toString().replaceAll(",", ""))
                .setAuthor({ name: "Teto Shop" })
                .setFooter({ text: `Requested by ${interaction.user.tag}` })
                .setTimestamp()
                .setColor("ff3067")
                .setThumbnail(
                  `https://d.furaffinity.net/art/vupiqueen/1655236864/1655236864.vupiqueen_fqx0vb5x0ain_mn.png`
                ),
            ],
            components: [client.button],
          });
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
    } else if (interaction.toString() === `/shop buy item:${item}`) {
      const fi = await ShopItems.findOne({ name: item });
      if (!fi)
        return interaction.reply({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: "Invalid Item" })
              .setDescription(`\`${item}\` does not exist in the shop!`)
              .setColor("DARK_RED")
              .setFooter({ text: `Requested by ${interaction.user.tag}` })
              .setTimestamp(),
          ],
        });
      const fb = await EconomyChecker.findOne({ user: interaction.user.id });
      if (!fb) {
        await EconomyChecker.create({ user: interaction.user.id, balance: 0 });
      }
      const ub = await EconomyChecker.findOne({ user: interaction.user.id });

      if (fi.price > ub.balance) {
        return interaction.reply({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: "Purchase Failed" })
              .setDescription(
                `
You do not have enough tedollars to buy **${item}**. You need **${Math.floor(
                  fi.price - ub.balance
                )}** more tedollars to buy the item.
`
              )
              .setColor("DARK_RED")
              .setFooter({ text: `Requested by ${interaction.user.tag}` })
              .setTimestamp(),
          ],
        });
      }
      const nb = ub.balance - fi.price;
      if (fi.role) {
        const member = await interaction.guild.members.fetch(
          interaction.user.id
        );
        const role = await interaction.guild.roles.fetch(fi.role);
        await member.roles.add(role).catch((e) => {
          console.log(e);
          client.err = true;
          interaction.reply(
            `An error has occured. <@!452436342841016341> ${e.toString()}`
          );
        });
        if (client.err) return;
        await EconomyChecker.findOneAndUpdate(
          { user: interaction.user.id },
          { balance: nb }
        );
        interaction.channel.send({
          embeds: [
            new MessageEmbed()
              .setAuthor({
                name: `${interaction.member.user.tag}`,
                iconURL: `${interaction.member.user.avatarURL()}`,
              })
              .setColor(`#ff3067`)
              .setDescription(
                `Added role <@&${fi.role}> to <@!${interaction.user.id}>`
              ),
          ],
        });
      }
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: "Item Purchased" })
            .setDescription(
              `You have successfully purchased ${item}. You now have **${nb}** tedollars.`
            )
            .setColor("GREEN")
            .setFooter({ text: `Requested by ${interaction.user.tag}` })
            .setTimestamp(),
        ],
      });
    }
  },
};
