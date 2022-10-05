const { Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "ready",
  /**
   * @param {Client} client
   * @param {Guild} guild
   */
  async execute(client) {
    setInterval(async () => {
      const guild = client.guilds.cache.get("946518364216520774");
      await guild.members.fetch();
      const trainees = guild.roles.cache.get("946525021545828422");
      traineesArr = [];
      if (trainees.members.size === 0) {
        traineesArr.push(
          "There is currently no staff member in the position of `Trainee Moderator`."
        );
      } else {
        trainees.members.forEach(async (m) => {
          if (!m.presence || m.presence.status === "offline") {
            traineesArr.push(`<:offline:989591896521338971> ${m.user}\n`);
          } else if (m.presence.status === "online") {
            traineesArr.push(`<:online:989591925407481857> ${m.user}\n`);
          } else if (m.presence.status === "dnd") {
            traineesArr.push(`<:dnd:989591866213290004> ${m.user}\n`);
          } else if (m.presence.status === "idle") {
            traineesArr.push(`<:idle:989591949994491934> ${m.user}\n`);
          }
        });
      }
      const mods = guild.roles.cache.get("946524686429347880");
      modsArr = [];
      if (mods.members.size === 0) {
        modsArr.push(
          "There is currently no staff member in the position of `Moderator`."
        );
      } else {
        mods.members.forEach(async (m) => {
          if (!m.presence || m.presence.status === "offline") {
            modsArr.push(`<:offline:989591896521338971> ${m.user}\n`);
          } else if (m.presence.status === "online") {
            modsArr.push(`<:online:989591925407481857> ${m.user}\n`);
          } else if (m.presence.status === "dnd") {
            modsArr.push(`<:dnd:989591866213290004> ${m.user}\n`);
          } else if (m.presence.status === "idle") {
            modsArr.push(`<:idle:989591949994491934> ${m.user}\n`);
          }
        });
      }
      const staffm = guild.roles.cache.get("993410506926850068");
      staffmArr = [];
      if (staffm.members.size === 0) {
        staffmArr.push(
          "There is currently no staff member in the position of `Staff Manager`."
        );
      } else {
        staffm.members.forEach(async (m) => {
          if (!m.presence || m.presence.status === "offline") {
            staffmArr.push(`<:offline:989591896521338971> ${m.user}\n`);
          } else if (m.presence.status === "online") {
            staffmArr.push(`<:online:989591925407481857> ${m.user}\n`);
          } else if (m.presence.status === "dnd") {
            staffmArr.push(`<:dnd:989591866213290004> ${m.user}\n`);
          } else if (m.presence.status === "idle") {
            staffmArr.push(`<:idle:989591949994491934> ${m.user}\n`);
          }
        });
      }
      const admin = guild.roles.cache.get("946524775994507264");
      adminArr = [];
      if (admin.members.size === 0) {
        adminArr.push(
          "There is currently no staff member in the position of `Admin`."
        );
      } else {
        admin.members.forEach(async (m) => {
          if (!m.presence || m.presence.status === "offline") {
            adminArr.push(`<:offline:989591896521338971> ${m.user}\n`);
          } else if (m.presence.status === "online") {
            adminArr.push(`<:online:989591925407481857> ${m.user}\n`);
          } else if (m.presence.status === "dnd") {
            adminArr.push(`<:dnd:989591866213290004> ${m.user}\n`);
          } else if (m.presence.status === "idle") {
            adminArr.push(`<:idle:989591949994491934> ${m.user}\n`);
          }
        });
      }
      const owner = guild.roles.cache.get("946524960082493440");
      ownerArr = [];
      if (owner.members.size === 0) {
        ownerArr.push(
          "There is currently no staff member in the position of `Owner`."
        );
      } else {
        owner.members.forEach(async (m) => {
          if (!m.presence || m.presence.status === "offline") {
            ownerArr.push(`<:offline:989591896521338971> ${m.user}\n`);
          } else if (m.presence.status === "online") {
            ownerArr.push(`<:online:989591925407481857> ${m.user}\n`);
          } else if (m.presence.status === "dnd") {
            ownerArr.push(`<:dnd:989591866213290004> ${m.user}\n`);
          } else if (m.presence.status === "idle") {
            ownerArr.push(`<:idle:989591949994491934> ${m.user}\n`);
          }
        });
      }
      traineesArr = traineesArr.toString().replaceAll(",", "");
      modsArr = modsArr.toString().replaceAll(",", "");
      staffmArr = staffmArr.toString().replaceAll(",", "");
      adminArr = adminArr.toString().replaceAll(",", "");
      ownerArr = ownerArr.toString().replaceAll(",", "");
      const channel = guild.channels.cache.get("1027151274111684628");
      channel.messages.fetch("1027157893247668266").then((m) => {
        try {
          m.edit({
            content: `
These are the current staff members of Neco Puppeteers' Cult, their positions and their status.

**Owners:**
> These are the people that own the discord server and manage The Puppeteers youtube channel.
${ownerArr}
**Admins:**
> These are the people that help and manage the discord server, and select new staff members.
${adminArr}
**Staff Manager:**
> These are the people who manage the moderators and trainees, and help with the moderation of the server.
${staffmArr}
**Moderators:**
> These are the people who moderate the server and have passed the training period.
${modsArr}
**Trainee Moderators:**
> These are the people who moderate the server but still are being trained.
${traineesArr}

> If you have any questions about the server, make a ticket in <#946523109924696074>, and if you have any questions about <@986354647688179742> feel free to DM <@452436342841016341>.
Last updated at <t:${Date.now() / 1000}>
          `,
          });
        } catch (e) {
          console.log(e);
        }
      });
    }, 15000);
  },
};
