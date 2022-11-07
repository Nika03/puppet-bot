const { serialize } = require("bson");
const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "custom-role",
  description: "Create or modify your custom role.",
  permission: "SEND_MESSAGES",
  type: "Utility",
  usage:
    "`/custom-role [name] [icon] [color], /custom-role [name] [icon], /custom-role [name] [color], /custom-role [name], /custom-role [icon], /custom-role [color]`",
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
    if (!roles.has("998713449783771156") && !roles.has("946524586080628856")) {
      return interaction.reply({
        content:
          "You cannot use this command without <@&998713449783771156> or <@&946524586080628856>.",
        ephemeral: true,
      });
    }
    if (!roles.has("998713449783771156")) {
      role_create_ding = 1;
    } else {
      role_create_ding = 0;
    }
    if (!roles.has("946524586080628856")) {
      role_create_dong = 1;
    } else {
      role_create_dong = 0;
    }
    if (role_create_ding + role_create_dong === 2) {
      return interaction.reply({
        content:
          "You cannot use this command without <@&998713449783771156> or <@&946524586080628856>.",
        ephemeral: true,
      });
    }
    role_exists = false;
    roles.forEach((r) => {
      if (r.name.includes("(Custom)")) {
        role_exists = true;
        role_to_modify = r;
      }
    });
    if (roles.has("970229987405877259")) {
      role_position = guild.roles.cache.get("1026815594001092638").position - 1;
      if (icon && color) {
        return interaction.reply({
          content:
            "You cannot have a custom role with color and icon as a staff member. Consider retiring.",
          ephemeral: true,
        });
      }
    } else {
      role_position = guild.roles.cache.get("970229987405877259").position - 1;
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
    name_for_role = false;
    if (name) {
      if (name.includes("(Custom)")) {
        name_for_role = name.replace("(Custom)", "");
        name_for_role = name_for_role + " (Custom)";
      } else {
        name_for_role = name + " (Custom)";
      }
    }
    if (!name_for_role) name_for_role = null;
    function edit_role(name, icon, color) {
      if (!name) name = role_to_modify.name;
      if (!color) color = role_to_modify.color;
      if (!icon) {
        icon = role_to_modify.icon;
      } else icon = icon.url;
      try {
        role_to_modify.edit({
          name: name,
          color: color,
          icon: icon,
        });
      } catch (e) {
        console.log(e, e.toString());
      }
    }
    function create_role(name, icon, color) {
      if (!icon) {
        icon = null;
      } else icon = icon.url;
      try {
        guild.roles
          .create({
            name: name,
            color: color,
            icon: icon,
          })
          .then(async (r) => {
            const member = await guild.members.fetch(interaction.user.id);
            member.roles.add(r.id);
            r.setPosition(role_position);
          });
      } catch (e) {
        console.log(e, e.toString());
      }
    }
    if (role_exists) {
      edit_role(name_for_role, icon, color);
      return interaction.reply({
        content: `I have modified your custom role since you already have one.`,
        ephemeral: true,
      });
    } else {
      if (!name) {
        return interaction.reply({
          content:
            "Cannot create custom role without a name and color. Please try again.",
          ephemeral: true,
        });
      }
      if (!color) {
        return interaction.reply({
          content:
            "Cannot create custom role without a name and color. Please try again.",
          ephemeral: true,
        });
      }
      create_role(name_for_role, color, icon);
      return interaction.reply({
        content: "I have created your custom role!",
        ephemeral: true,
      });
    }
  },
};
