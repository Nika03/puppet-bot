const { Client, Guild, MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const { db_credentials } = require("../../Structures/config.json");

module.exports = {
  name: "ready",
  once: true,
  /**
   * @param {Client} client
   * @param {Guild} guild
   */
  async execute(client) {
    console.log("Puppet bot is online!");
    client.user.setActivity("neco arc stumble to death.", { type: "WATCHING" });

    const URI = db_credentials;
    const URIParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    mongoose.connect(URI, URIParams, (err) => {
      if (err) console.log("⚠ Couldnt connect to Puppet Database, " + err);
      else console.log(`🔘 Successfully connected to Puppet Database.`);
    });
    const RestartsModel = require("../../Structures/Schema/Restarts.js");
    const current_restarts = await RestartsModel.findOne({ owner: "Darkeew" });
    if (!current_restarts) {
      await RestartsModel.create({
        restarts: "1",
        allguilds: client.guilds.cache.map((guild) => guild.id),
      });
      return;
    } else {
      current_restarts.restarts++;
      await current_restarts.save();
    }
    const CasesModel = require("../../Structures/Schema/Cases");

    //Change this
    //const g = '986357448925401168' //Test server id
    const g = "946518364216520774"; //Puppet server id

    const guild = client.guilds.cache.get(g);

    client.botuptime = Date.now() / 1000;

    // Ban Checker
    setInterval(async () => {
      const c = await CasesModel.find();
      c.forEach(async (c) => {
        if (c.type === "ban") {
          if (c.expired === false) {
            if (c.time < Date.now() / 1000) {
              const cn = c.case;
              await CasesModel.findOneAndUpdate(
                { case: cn },
                { expired: true },
                {
                  reason_for_expire: `This user has been unbanned since <t:${c.time}>`,
                },
                {
                  staff_who_expired: "986354647688179742",
                }
              );
              user = c.punished;
              await CasesModel.create({
                type: "unban",
                punished: user,
                case: current_restarts.cases,
                pardoner: "Automaticly Unbanned",
                reason_for_expire: "This user has been automaticly unbanned.",
                time: Math.floor(Date.now() / 1000),
              });
              current_restarts.cases++;
              await current_restarts.save();
              try {
                guild.members.unban(user);
                const ch = "1009968902941442119";
                const logs = guild.channels.cache.get(ch);
                logs.send({
                  embeds: [
                    new MessageEmbed()
                      .setAuthor({ name: `Unban` })
                      .setColor("DARK_GOLD")
                      .setDescription(
                        `<@!${user}> (${user}) has been unbanned. This user has been unbanned due to their ban time ending.`
                      )
                      .setTimestamp(),
                  ],
                });
              } catch (e) {
                console.log(e);
              }
            }
          }
        }
      });
    }, 5000);
    // Warn Checker
    setInterval(async () => {
      client.stop2 = false;
      z = 1;
      do {
        const wc = await CasesModel.findOne({ case: z });
        if (!wc) client.stop2 = true;
        else if (wc.type === "warn") {
          if (wc.expired === false) {
            if (wc.time < Date.now() / 1000) {
              await CasesModel.findOneAndUpdate({ case: z }, { expired: true });
              const member = guild.members.cache.get(wc.punished);
              try {
                member.send({
                  embeds: [
                    new MessageEmbed()
                      .setAuthor({ name: "Case Expired" })
                      .setDescription(
                        `**Case ${wc.case}** has been expired. Be more careful next time and read the rules!
> Reason of the punishment: \`${wc.reason}\`
> Punisher: <@!${wc.punisher}> (${wc.punisher})

> Reason for expire: \`14 days have passed since case ${wc.case} was made\`.
                `
                      )
                      .setColor("DARK_GOLD"),
                  ],
                });
              } catch (e) {
                console.log(e);
              }
              const ch = "1009968902941442119";
              const logs = guild.channels.cache.get(ch);
              logs.send({
                embeds: [
                  new MessageEmbed()
                    .setAuthor({ name: `Warn ${wc.case} expired` })
                    .setColor("DARK_GOLD")
                    .setDescription(
                      `Case **${wc.case}** has been expired. The user punished for this warn was <@!${wc.punished}>.`
                    )
                    .setTimestamp(),
                ],
              });
              const UMM = require("../../Structures/Schema/UserModeration");
              const rm = await UMM.findOne({ user: wc.punished });
              const nw = rm.warns - 1;
              await UMM.findOneAndUpdate({ user: wc.punished }, { warns: nw });
              client.stop2 = true;
            } else z++;
          } else z++;
        } else z++;
      } while (client.stop2 !== true);
    }, 5000);
    //Verification edit message
    const rc = await Math.floor(Math.random() * 5);
    if (rc === 0) client.color = "🟥";
    if (rc === 1) client.color = "🟩";
    if (rc === 2) client.color = "🟦";
    if (rc === 3) client.color = "🟫";
    if (rc === 4) client.color = "🟧";
    if (rc === 5) client.color = "🟪";
    const channel = guild.channels.cache.get("946528426687336559");
    channel.messages.fetch("1008858316509806644").then((m) => {
      try {
        m.edit({
          embeds: [
            new MessageEmbed()
              .setAuthor({ name: "Verification" })
              .setDescription(
                `
  Hello! Welcome to **Neco Puppeteers' Cult.** 
  
  > In order to verify, you need to press the ${client.color} reaction. Failing to do this will get you timed out for 5 minutes.
  
  > **Having problems?**
  Open a ticket in <#946523109924696074>! The staff members will assist you further.
  
  Remember, have fun in the server!
            `
              )
              .setColor("DARK_RED")
              .setTimestamp(),
          ],
        });
      } catch (e) {
        console.log(e);
      }
    });
    setInterval(async () => {
      const rc = await Math.floor(Math.random() * 5);
      if (rc === 0) client.color = "🟥";
      if (rc === 1) client.color = "🟩";
      if (rc === 2) client.color = "🟦";
      if (rc === 3) client.color = "🟫";
      if (rc === 4) client.color = "🟧";
      if (rc === 5) client.color = "🟪";
      const channel = guild.channels.cache.get("946528426687336559");
      channel.messages.fetch("1008858316509806644").then((m) => {
        try {
          m.edit({
            embeds: [
              new MessageEmbed()
                .setAuthor({ name: "Verification" })
                .setDescription(
                  `
  Hello! Welcome to **Neco Puppeteers' Cult.** 
  
  > In order to verify, you need to press the ${client.color} reaction. Failing to do this will get you timed out for 5 minutes.
  
  > **Having problems?**
  Open a ticket in <#946523109924696074>! The staff members will assist you further.
  
  Remember, have fun in the server!
            `
                )
                .setColor("DARK_RED")
                .setTimestamp(),
            ],
          });
        } catch (e) {
          console.log(e);
        }
      });
    }, 1800000);
  },
};
