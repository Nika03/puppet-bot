const { CommandInteraction, MessageEmbed } = require("discord.js");
const { tenor } = require('../../../Functions/getTenor');

module.exports = {
	name: "poke",
	description: "Poke someone!",
	permission: "SEND_MESSAGES",
	type: "Actions",
	usage: "/poke [user]",
	options: [
		{
			name: `user`,
			description: `The user to poke!`,
			required: true,
			type: `USER`,
		},
	],
	/**
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		/* interaction.reply({
			content: "This command is currently disabled.",
			ephemeral: true,
		}); */

		const user = interaction.options.getUser(`user`);

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
		if (user.id === interaction.user.id) {
			return interaction.reply({
				embeds: [new MessageEmbed().setDescription(`You cannot poke yourself!`)],
				ephemeral: true,
			});
		}

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
							`You cannot poke a bot! Have a floppa pillow instead.`
						)
						.setImage(floppa)
						.setFooter({ text: `floppa floppa floppa floppa` }),
				],
			});
		}

		const q = "poke_anime";

		try {
			tenor(q, interaction, MessageEmbed, "pokes", interaction.member.user, user, " boop!");
		} catch (err) {
			console.log(err);
			interaction.reply('Oops, there was an error\n<@453944662093332490>');
		}
	},
};
