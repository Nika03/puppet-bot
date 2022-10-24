const { Message, MessageEmbed, Client } = require("discord.js");

module.exports = {
  name: "messageCreate",
  /**
   * @param {Message} message
   * @param {Client} client
   */
  async execute(message, client) {
    if (
      message.toString() ===
      "https://media.discordapp.net/attachments/946520764297912343/1034043730098917426/fed0e5ba285c845cd3e661792703b24e.jpg?width=614&height=702"
    ) {
      try {
        await member.timeout(60000, "Stop.");
        return;
      } catch (e) {
        console.log(e);
      }
    }
    if (message.channel.id === "946520764297912343") {
      const random_number1 = Math.floor(Math.random() * 250);
      const random_number2 = Math.floor(Math.random() * 250);
      if (random_number1 === random_number2) {
        message.reply("https://tenor.com/view/whygena-reggie-gif-20262381");
      }
    }
    if (message.channel.id === "1006613586157764659") {
      if (message.author.bot) {
        message.delete();
      } else if (
        message.toString() !== "Do you know who else suffers from dementia?"
      ) {
        setTimeout(() => {
          message.delete();
        }, 100);
        try {
          const guild = client.guilds.cache.get("946518364216520774");
          const member = guild.members.cache.get(message.author.id);
          await member.timeout(
            60000,
            "Do you know who else suffers from dementia?"
          );
        } catch (e) {
          console.log(e);
        }
      }
    }
    if (message.channel.id === "1016338379836756058") {
      if (message.author.bot) {
        message.delete();
      } else if (message.toString() !== "huh") {
        setTimeout(() => {
          message.delete();
        }, 100);
        try {
          const guild = client.guilds.cache.get("946518364216520774");
          const member = guild.members.cache.get(message.author.id);
          await member.timeout(60000, "huh");
        } catch (e) {
          console.log(e);
        }
      }
    }
    if (message.author.bot) return;
    if (message.toString().includes("/")) return;

    const allowedchannels = [
      `946520764297912343`,
      `946520785764372511`,
      `946521056380858378`,
      `946522446025080903`,
      `964855357149167646`,
      `946530497255845888`,
      `946521074647048212`,
    ];

    if (!allowedchannels.includes(message.channel.id)) return;

    const random_number1 = Math.floor(Math.random() * 100);
    const random_number2 = Math.floor(Math.random() * 100);

    const EconomyChecker = require(`../../Structures/Schema/Economy_Checker`);
    const exists = await EconomyChecker.findOne({ user: message.author.id });
    if (!exists) {
      await EconomyChecker.create({ user: message.author.id, balance: 0 });
    }

    const user = await EconomyChecker.findOne({ user: message.author.id });

    if (random_number1 === random_number2) {
      client.random_amount = Math.floor(Math.random() * 250);
      if (client.random_amount === 0) {
        client.random_amount = 1;
      }
      message.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({
              name: `Teto Trader`,
              iconURL: `https://static.wikia.nocookie.net/mikumikudance/images/c/c2/Teto_Halloween_by_Uri.png/revision/latest?cb=20131018161253`,
            })
            .setDescription(
              `Spooky! I've given you **${client.random_amount}** <:tedollar:987097348305997847> tedollars for chatting in ${message.channel}!`
            )
            .setFooter({ text: "Happy October" })
            .setColor(`FE9B13`)
            .setThumbnail(
              `https://i.pinimg.com/originals/80/8a/02/808a02b37a9cd2e134fad2ac1f5cb937.jpg`
            )
            .setTimestamp(),
        ],
      });
      const new_balance = user.balance + client.random_amount;
      await EconomyChecker.findOneAndUpdate(
        { user: message.author.id },
        { balance: new_balance }
      );
    }
  },
};
