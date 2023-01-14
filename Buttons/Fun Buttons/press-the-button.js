const { MessageActionRow, MessageButton } = require("discord.js");
const User = require("../../Structures/Schema/User");
const RestartsModel = require("../../Structures/Schema/Restarts");

module.exports = {
  id: "press-the-button",
  permission: "SEND_MESSAGES",

  async execute(interaction) {
    interaction.deferUpdate();
    var finder = await User.findOne({ user: interaction.user.id });
    if (!finder)
      await User.create({ user: interaction.user.id, button_presses: 0 });
    var finder = await User.findOne({ user: interaction.user.id });
    const presses = finder.button_presses + 1;
    await User.findOneAndUpdate(
      { user: interaction.user.id },
      { button_presses: presses }
    );
    var find = await RestartsModel.findOne();
    if (!find.button_presses)
      await RestartsModel.findOneAndUpdate({}, { button_presses: 0 });
    var find = await RestartsModel.findOne();
    var counter = find.button_presses + 1;
    await RestartsModel.findOneAndUpdate({}, { button_presses: counter });
  },
};
