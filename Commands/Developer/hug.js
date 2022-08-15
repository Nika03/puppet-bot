const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "hug",
  description: "Hug someone! (Command requested by: Noctis Clock Ticks#0082)",
  permission: "SEND_MESSAGES",
  options: [
    {
      name: `user`,
      description: `The user to hug!`,
      required: true,
      type: `USER`,
    },
  ],
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const SettingsModel = require("../../Structures/Schema/Settings.js");
    const is_blacklisted = await SettingsModel.findOne({
      channel: interaction.channel.id,
    });
    if (is_blacklisted !== null) {
      if (!is_blacklisted.commands.includes(`hug`)) {
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

    const random_image = Math.floor(Math.random() * 5);
    if (random_image === 1) {
      global.img = `https://i.pinimg.com/originals/3a/c9/6f/3ac96f477a690c84d81302c171d51fe1.gif`;
    } else if (random_image === 2) {
      global.img = `https://i.pinimg.com/originals/85/dc/ef/85dcef131af84b515106955e142df54e.gif`;
    } else if (random_image === 3) {
      global.img = `https://media1.giphy.com/media/GMFUrC8E8aWoo/giphy.gif`;
    } else if (random_image === 4) {
      global.img = `https://64.media.tumblr.com/28bb92375b809a23fc2eb42c071111d2/tumblr_nh7ozxV8qt1sglevjo1_500.gif`;
    } else if (random_image === 5) {
      global.img = `https://i.gifer.com/fetch/w300-preview/c2/c26b0bee0ba5d37b8dacb4077f117d6e.gif`;
    } else {
      global.img = `https://c.tenor.com/Cuh9WL0xklIAAAAC/anime-hug.gif`;
    }

    const random_floppa = Math.floor(Math.random() * 5);
    if (random_floppa === 1) {
      global.floppa = `https://ae01.alicdn.com/kf/H92f957da6e2c4bc6b4d7bad9be0f527b9.jpg_640x640Q90.jpg_.webp`;
    } else if (random_floppa === 2) {
      global.floppa = `https://ae01.alicdn.com/kf/H04f4d57acf784ef79da6684ead62679ba/Floppa-bonito-551-dakimakura-fronha-fronha-almofada-almofada-sof-fronhas-50x50-veludo.jpg_Q90.jpg_.webp`;
    } else if (random_floppa === 3) {
      global.floppa = `https://ae01.alicdn.com/kf/H4ca38fa59d2d488dab4bdc26fa8e142eJ/Capa-de-almofada-big-floppa-gangster-gato-45x45cm-decora-o-impress-o-travesseiro-de-lance-para.jpg_Q90.jpg_.webp`;
    } else if (random_floppa === 4) {
      global.floppa = `https://ae01.alicdn.com/kf/Hfe98cb710ab54ed8a768776c52a9127dw/Comunismo-floppa-bonito-meme-coxim-cobre-sof-decora-o-gato-caracal-quadrado-throw-fronha-40x40cm.jpg_Q90.jpg_.webp`;
    } else if (random_floppa === 5) {
      global.floppa = `https://ae01.alicdn.com/kf/S9481ffbb9e634897947037ff8173ce32o/O-holy-floppa-capa-de-almofada-para-casa-decorativa-engra-ado-caracal-gato-capa-de-almofada.jpg_Q90.jpg_.webp`;
    } else {
      global.floppa = `https://m.media-amazon.com/images/I/61aK3rgtYxL._AC_SX679_.jpg`;
    }
    console.log(random_floppa);
    const user = interaction.options.getUser(`user`);
    if (user.bot) {
      return interaction.reply({
        embeds: [
          new MessageEmbed()
            .setColor(`DARK_GOLD`)
            .setAuthor({
              name: `${interaction.member.user.tag}`,
              iconURL: `${interaction.member.user.avatarURL()}`,
            })
            .setDescription(
              `You cannot hug a bot! Have a floppa pillow instead.`
            )
            .setImage(floppa)
            .setFooter({ text: `floppa floppa floppa floppa` }),
        ],
      });
    }
    if (user.id === interaction.user.id) {
      return interaction.reply({
        embeds: [new MessageEmbed().setDescription(`You cannot hug yourself!`)],
        ephemeral: true,
      });
    }
    interaction.reply({
      content: `${user}, ${interaction.user} has decided to hug you!`,
      embeds: [
        new MessageEmbed()
          .setColor(`DARK_GOLD`)
          .setAuthor({
            name: `${interaction.member.user.tag}`,
            iconURL: `${interaction.member.user.avatarURL()}`,
          })
          .setImage(img)
          .setFooter({ text: `So cute!` }),
      ],
    });
  },
};
