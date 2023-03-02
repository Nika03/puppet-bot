const {
  Client,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require("discord.js");
const axios = require("axios");
const { moderatecontentkey } = require("../../Structures/config.json");
const BlacklistModel = require("../../Structures/Schema/Blacklist");

module.exports = {
  name: "guildMemberAdd",
  /**
   * @param {Client} client
   * @param {Guild} guild
   */
  async execute(member, client) {
    const guild = client.guilds.cache.get("946518364216520774");
    /* axios
      .get("https://api.moderatecontent.com/moderate/", {
        params: {
          key: moderatecontentkey,
          url: member.user.avatarURL(),
        },
      })
      .then(async (response) => {
        if (response.data.predictions.adult > 85) {
          const logs = guild.channels.cache.get("1009968902941442119");
          logs.send({
            content: `
${member.user}
> @everyone
> ${member.user}'s profile picture has been flagged as **NSFW** and the user has been blacklisted. They cannot talk in any channels or verify until they are manually verified.
> 
> Adult Rating: \`${response.data.predictions.adult}\`
> 
> ${member.user}'s profile picture:
`,
            files: [
              {
                attachment: member.user.avatarURL(),
                name: "SPOILER_PROFILE_PICTURE.jpg",
              },
            ],
            components: [
              new MessageActionRow().addComponents(
                new MessageButton()
                  .setCustomId("unblacklist")
                  .setLabel("Unblacklist")
                  .setStyle("DANGER")
              ),
            ],
          });
          const user = await BlacklistModel.findOne({ user: member.user.id });
          if (!user) {
            await BlacklistModel.create({ user: member.user.id });
          }
          return;
        }
      });
    const user = await BlacklistModel.findOne({ user: member.user.id });
    if (!user) {
      const RestartsModel = require("../../Structures/Schema/Restarts");
      const status = await RestartsModel.findOne();
      if (status.verification === false) {
        const user = await guild.members.fetch(member.user.id);
        try {
          user.roles.add("946524059724820500");
        } catch (e) {
          console.log(e);
        }
      }
    } */
  },
};
