const { serialize } = require("bson");
const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "custom-role",
  description: "Create or modify your custom role.",
  permission: "SEND_MESSAGES",
  type: "Utility",
  usage: "`In development.`",
  options: [
    {
      name: "name",
      description: "The name for your custom role.",
      type: "STRING",
      required: false,
    },
    {
      name: "icon",
      description: "The icon for the custom role.",
      type: "ATTACHMENT",
      required: false,
    },
    {
      name: "color",
      description: "The color for your custom role.",
      type: "STRING",
      required: false,
    },
  ],

  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (interaction.user.id !== "452436342841016341") {
      return interaction.reply({
        content: "This command is currently being developed.",
        ephemeral: true,
      });
    }
    const icon = interaction.options.getAttachment("icon");
    const color = interaction.options.getString("color");
    const guild = client.guilds.cache.get(interaction.guild.id);
    const member = guild.members.cache.get(interaction.user.id);
    const name = interaction.options.getString("name");
    if (!name && !color && !icon) {
      return interaction.reply({
        content: "You must choose an option for your custom role.",
        ephemeral: true,
      });
    }
    const roles = member.roles.cache;
    roles.forEach((r) => {
      if (r.name.includes("(Custom)")) {
        role_exists = true;
        role_to_modify = r;
      }
    });
    if (roles.has("970229987405877259")) {
      if (icon && color) {
        return interaction.reply({
          content:
            "You cannot have a custom role with color and icon as a staff member. Consider retiring.",
          ephemeral: true,
        });
      }
    }
    if (name) {
      if (name.length > 100 - 9) {
        interaction.reply({
          content: "The name for your custom role is too big.",
          ephemeral: true,
        });
      }
    }
    if (icon) {
      if (icon.size > "262144") {
        return interaction.reply({
          content: `Role icon must be less than 256kb in size. *(The icon you chose is ${Math.floor(
            icon.size / 1024
          )}kb in size)*`,
          ephemeral: true,
        });
      }
    }
    if (color) {
      if (/^#[0-9A-F]{6}$/i.test(color) === false) {
        return interaction.reply({
          content:
            'The role color is invalid. *Perhaps you forgot to add "#" at the beginning?*',
          ephemeral: true,
        });
      }
    }
    if (name.includes("(Custom)")) {
      name_for_role = name.replace("(Custom)", "");
      name_for_role = name_for_role + " (Custom)";
    } else {
      name_for_role = name + " (Custom)";
    }
    try {
      if (role_exists) {
        if (name && icon && color) {
          role_to_modify.edit({
            name: name_for_role,
            color: color,
            icon: icon.url,
          });
        } else if (name && icon) {
          role_to_modify.edit({
            name: name_for_role,
            icon: icon.url,
          });
        } else if (name && color) {
          role_to_modify.edit({
            name: name_for_role,
            color: color,
          });
        } else if (name) {
          role_to_modify.edit({
            name: name_for_role,
          });
        } else if (color) {
          role_to_modify.edit({
            color: color,
          });
        } else if (icon) {
          role_to_modify.edit({
            icon: icon.url,
          });
        }
      }
    } catch (e) {
      console.log(e.toString());
    }
  },
};
