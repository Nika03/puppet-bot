const {
  CommandInteraction,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require("discord.js");

module.exports = {
  name: "trivia",
  description: "Send a trivia game to general.",
  permission: "ADMINISTRATOR",
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    client.donoteditthemessageagainpls = false;
    client.alreadyawnsered = [];
    client.correctawnser = "";
    const questions = [
      "placeholder",
      //TRVA1
      "What countries made up the original Axis powers in World War II?",
      //TVRA2
      "What geometric shape is generally used for stop signs?",
      //TRVA3
      'What is "cynophobia"?',
      //TRVA4
      "What is the name of the largest ocean on earth?",
      //TRVA5
      "What is the active component of chili peppers that make them spicy?",
      //TRVA6
      "What is the largest company in the world based off of consolidated revenue?",
      //TRVA7
      "What was the fastest internet speed ever achieved?",
    ];
    const awnsers = [
      //TRVA1
      "CorrectGermany, Italy, and Japan1",
      "Germany, France and Japan1",
      "Italy and Germany1",
      //TRVA2
      "Triangle2",
      "Hexagon2",
      "CorrectOctagon2",
      //TRVA3
      "Fear of Cats3",
      "CorrectFear of Dogs3",
      "Fear of Ducks3",
      //TRVA4
      "CorrectPacific Ocean4",
      "Atlantic Ocean4",
      "Indian Ocean4",
      //TRVA5
      "Piperine5",
      "Aflatoxin B15",
      "CorrectCapsaicin5",
      //TRVA6
      "Apple6",
      "CorrectWalmart6",
      "Amazon6",
      //TRVA7
      "91 gigabits/second7",
      "Correct319 terabits/second7",
      "261 megabits/second7",
    ];
    x = 0;
    z = 0;
    y = 0;
    const q = Math.floor(Math.random() * questions.length) + 1;
    const getquestion = questions[q];
    getawnsers = [];
    fstop = false;
    fcastop = false;
    do {
      if (z === awnsers.length) fstop = true;
      if (fstop === false) {
        if (awnsers[z].endsWith(q.toString())) {
          getawnsers.push(awnsers[z]);
          z++;
        } else {
          z++;
        }
      }
    } while (fstop === false);
    do {
      if (y > 2) fcastop = true;
      if (fcastop === false) {
        if (getawnsers[y].startsWith("Correct")) {
          correctawnser = getawnsers[y].replace("Correct", "");
          correctawnser = correctawnser.slice(0, -1);
          client.correctawnser = correctawnser;
          fcastop = true;
        } else {
          y++;
        }
      }
    } while (fcastop === false);
    slicedawnsers = [];
    do {
      str = getawnsers[x];
      str = str.slice(0, -1);
      if (str.startsWith("Correct")) {
        str = str.replace("Correct", "");
        const buttonnumber = getawnsers.indexOf(getawnsers[x]) + 1;
        if (buttonnumber === 1) {
          client.correctbutton = "trivia1";
        } else if (buttonnumber === 2) {
          client.correctbutton = "trivia2";
        } else if (buttonnumber === 3) {
          client.correctbutton = "trivia3";
        }
      }
      slicedawnsers.push(str);
      x++;
    } while (x !== 3);
    interaction.reply({
      embeds: [
        new MessageEmbed()
          .setAuthor({ name: "Trivia Event" })
          .setDescription(
            `
Awnser the following question within 15 seconds:
**${getquestion}**
        `
          )
          .setFooter({ text: `Trivia Question ${q}` }),
      ],
      components: [
        new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId(`trivia1`)
            .setLabel(`${slicedawnsers[0]}`)
            .setStyle(`SUCCESS`),
          new MessageButton()
            .setCustomId(`trivia2`)
            .setLabel(`${slicedawnsers[1]}`)
            .setStyle(`SUCCESS`),
          new MessageButton()
            .setCustomId(`trivia3`)
            .setLabel(`${slicedawnsers[2]}`)
            .setStyle(`SUCCESS`)
        ),
      ],
    });
    setTimeout(() => {
      if (client.donoteditthemessageagainpls === true) return;
      interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: "Trivia Event" })
            .setDescription(
              "Nobody awnsered the trivia event in time! Maybe next time."
            ),
        ],
        components: [],
      });
    }, 15000);
  },
};
