const { CommandInteraction, MessageEmbed } = require("discord.js");
const { Token } = require("../../Structures/config.json");
const exec = require("child_process").exec;

module.exports = {
  name: "debug",
  description: "Do some debug stuff.",
  permission: "SEND_MESSAGES",
  type: "Forbidden",
  usage: "`Forbidden`",
  options: [
    {
      name: "option",
      description: "Option to debug.",
      type: "STRING",
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
        content: "You cannot run this command.",
        ephemeral: true,
      });
    }
    const string = interaction.options.getString("option");
    if (string === "restart") {
      interaction.reply({ content: "Restarting...", ephemeral: true });
      exec("pm2 restart index", { encoding: "utf-8" }).then(() => {
        interaction.channel.send("Restarted.");
      });
    }
  },
};
