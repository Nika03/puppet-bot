const { CommandInteraction, MessageEmbed } = require("discord.js");
const RestartsModel = require("../../Structures/Schema/Restarts");

module.exports = {
  name: "imgfilter",
  description: "View, enable or disable the image filter.",
  permission: "MANAGE_MESSAGES",
  usage: "`/imgFilter, /imgFilter [value]`",
  type: "Other",
  options: [
    {
      name: "value",
      description: "Set the filter on or off.",
      type: "BOOLEAN",
      required: false,
    },
  ],
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const setting = await RestartsModel.findOne();
    if (interaction.toString() === "/imgfilter") {
      if (!setting.imageFilter) {
        imgfilter_boolean = "off";
      } else {
        imgfilter_boolean = "on";
      }
      return interaction.reply({
        embeds: [
          new MessageEmbed()
            .setDescription(`The image filter is currently **${boolean}**.`)
            .setColor("YELLOW")
            .setFooter({ text: `Requested by ${interaction.user.tag}` })
            .setTimestamp(),
        ],
      });
    } else {
      const boolean = interaction.options.getBoolean("value");
      if (boolean === true) {
        imgfilter_response = "on";
      } else {
        imgfilter_response = "off";
      }
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setDescription(
              `The image filter has been turned **${imgfilter_response}**.`
            )
            .setColor("YELLOW")
            .setFooter({ text: `Requested by ${interaction.user.tag}` })
            .setTimestamp(),
        ],
      });
      setting.imageFilter = boolean;
    }
  },
};
