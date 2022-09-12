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
      //TRVA0
      "What countries made up the original Axis powers in World War II?",
      //TVRA1
      "What geometric shape is generally used for stop signs?",
      //TRVA2
      'What is "cynophobia"?',
      //TRVA3
      "What is the name of the largest ocean on earth?",
      //TRVA4
      "What is the active component of chili peppers that make them spicy?",
      //TRVA5
      "What is the largest company in the world based off of consolidated revenue?",
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
    interaction
      .reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: "Trivia Event" })
            .setDescription(
              `
Awnser the following question within 15 seconds:
**${getquestion}**
        `
            )
            .setFooter({ text: `Trivia Question ${q + 1}` }),
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
      })
      .then((message) => {
        setTimeout(() => {
          if (client.triviatimeout === true) {
            if (client.donoteditthemessageagainpls === true) return;
            message.edit({
              embeds: [
                new MessageEmbed()
                  .setAuthor({ name: "Trivia Event" })
                  .setDescription(
                    "Nobody awnsered the trivia event in time! Maybe next time."
                  ),
              ],
              components: [],
            });
          }
        }, 15000);
      });
  },
};
