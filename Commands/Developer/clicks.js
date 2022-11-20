const { CommandInteraction, MessageEmbed } = require("discord.js");
const User = require("../../Structures/Schema/User");
const RestartsModel = require("../../Structures/Schema/Restarts");

module.exports = {
  name: "clicks",
  description: "Check how many times you've clicked!",
  permission: "SEND_MESSAGES",
  type: "Utility",
  usage: "`/clicks`",

  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    var user = await User.findOne({ user: interaction.user.id });
    if (!user) {
      return interaction.reply({
        content:
          "You havent clicked on the button yet! Go to <#1043617304560279733> to start clicking!",
      });
    }
    interaction.reply({ content: `You have ${user.button_presses} clicks.` });
  },
};
