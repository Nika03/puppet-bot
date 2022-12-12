const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "staff-list",
  description: "Shows the current staff and their positions as a staff.",
  permission: "SEND_MESSAGES",
  type: "Utility",
  usage: "`/staff-list`",
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const SettingsModel = require("../../Structures/Schema/Settings.js");
    const is_blacklisted = await SettingsModel.findOne({
      channel: interaction.channel.id,
    });
    if (is_blacklisted) {
      if (!is_blacklisted.commands.includes(`staff-list`)) {
        return interaction.reply({
          embeds: [
            new MessageEmbed().setDescription(
              `This command has been disabled in this channel.`
            ),
          ],
          ephemeral: true,
        });
      }
    } else {
      if (!is_blacklisted) {
      } else {
        return interaction.reply({
          embeds: [
            new MessageEmbed().setDescription(
              `This command has been disabled in this channel.`
            ),
          ],
          ephemeral: true,
        });
      }
    }
    const list = client.guilds.cache.get(`946518364216520774`);
    await list.members.fetch();

    //check for trainees
    if (list.roles.cache.get(`946525021545828422`).members.size === 0) {
      client.trainees = `There is currently no staff member in the position of \`Trainee Moderator\`.`;
    } else {
      client.trainees = list.roles.cache
        .get(`946525021545828422`)
        .members.map((m) => {
          if (!m.presence || m.presence.status === "offline") {
            return `<:offline:989591896521338971> \`${m.user.tag}\` `;
          } else if (m.presence.status === `online`) {
            return `<:online:989591925407481857> \`${m.user.tag}\` `;
          } else if (m.presence.status === `dnd`) {
            return `<:dnd:989591866213290004> \`${m.user.tag}\` `;
          } else if (m.presence.status === `idle`) {
            return `<:idle:989591949994491934> \`${m.user.tag}\` `;
          }
        });
    }

    //check for mods
    if (list.roles.cache.get(`946524686429347880`).members.size === 0) {
      client.mods = `There is currently no staff member in the position of \`Moderator\`.`;
    } else {
      client.mods = list.roles.cache
        .get(`946524686429347880`)
        .members.map((m) => {
          if (!m.presence || m.presence.status === "offline") {
            return `<:offline:989591896521338971> \`${m.user.tag}\` `;
          } else if (m.presence.status === `online`) {
            return `<:online:989591925407481857> \`${m.user.tag}\` `;
          } else if (m.presence.status === `dnd`) {
            return `<:dnd:989591866213290004> \`${m.user.tag}\` `;
          } else if (m.presence.status === `idle`) {
            return `<:idle:989591949994491934> \`${m.user.tag}\` `;
          }
        });
    }

    //check for admins
    if (list.roles.cache.get(`946524775994507264`).members.size === 0) {
      client.admins = `There is currently no staff member in the position of \`Admin\`.`;
    } else {
      client.admins = list.roles.cache
        .get(`946524775994507264`)
        .members.map((m) => {
          if (!m.presence || m.presence.status === "offline") {
            return `<:offline:989591896521338971> \`${m.user.tag}\` `;
          } else if (m.presence.status === `online`) {
            return `<:online:989591925407481857> \`${m.user.tag}\` `;
          } else if (m.presence.status === `dnd`) {
            return `<:dnd:989591866213290004> \`${m.user.tag}\` `;
          } else if (m.presence.status === `idle`) {
            return `<:idle:989591949994491934> \`${m.user.tag}\` `;
          }
        });
    }

    //check for owners
    if (list.roles.cache.get(`946524960082493440`).members.size === 0) {
      client.owners = `There is currently no staff member in the position of \`Owner\`.`;
    } else {
      client.owners = list.roles.cache
        .get(`946524960082493440`)
        .members.map((m) => {
          if (!m.presence || m.presence.status === "offline") {
            return `<:offline:989591896521338971> \`${m.user.tag}\` `;
          } else if (m.presence.status === `online`) {
            return `<:online:989591925407481857> \`${m.user.tag}\` `;
          } else if (m.presence.status === `dnd`) {
            return `<:dnd:989591866213290004> \`${m.user.tag}\` `;
          } else if (m.presence.status === `idle`) {
            return `<:idle:989591949994491934> \`${m.user.tag}\` `;
          }
        });
    }
    interaction.reply({
      embeds: [
        new MessageEmbed()
          .setAuthor({ name: `Staff List` })
          .setDescription(
            `
Here are the current staff members, their position, and their status:
**Owners:**
${client.owners.toString().replaceAll(`,`, ` `)}

**Admins:**
${client.admins.toString().replaceAll(`,`, ` `)}

**Moderators:**
${client.mods.toString().replaceAll(`,`, ` `)}

**Trainee Moderators:**
${client.trainees.toString().replaceAll(`,`, ` `)}
            `
          )
          .setColor(`#ff3067`)
          .setThumbnail(
            `https://d.furaffinity.net/art/vupiqueen/1655236864/1655236864.vupiqueen_fqx0vb5x0ain_mn.png`
          )
          .setTimestamp(),
      ],
    });
  },
};
