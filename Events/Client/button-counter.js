const { Client, Guild, MessageEmbed } = require("discord.js");
const RestartsModel = require("../../Structures/Schema/Restarts");

module.exports = {
  name: "ready",
  /**
   * @param {Client} client
   * @param {Guild} guild
   */
  async execute(client) {
    const guild = client.guilds.cache.get("946518364216520774");
    const channel = guild.channels.cache.get("1043617304560279733");
    setInterval(async () => {
      var find = await RestartsModel.findOne();
      if (!find.button_presses)
        await RestartsModel.findOneAndUpdate({}, { button_presses: 0 });
      var find = await RestartsModel.findOne();
      var counter = find.button_presses;
      channel.messages.fetch("1043625240556740721").then(async (m) => {
        m.edit({
          embeds: [
            new MessageEmbed()
              .setTitle("Press The Button!")
              .setDescription(
                `
          Its simple, press the button, and the counter will go up!
    
          > __Counter:__ \`${counter} clicks\`
          
          Current Main Goal: \`250'000 clicks\`
          > Prize: \`Nitro Regular\`
    
          Current Subgoal: \`10'000 clicks\`
          > Prize: \`Top 10 will get a custom role giveaway.\`
    
          Last Updated: <t:${Math.floor(Date.now() / 1000)}:R>
          *If the button isnt working, please DM <@!452436342841016341>. The counter will update each minute.*
          `
              )
              .setColor("DARK_RED"),
          ],
        });
      });
    }, 60000);
  },
};
