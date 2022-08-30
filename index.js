const { Client, Collection } = require("discord.js");
const client = new Client({ intents: 32767 });
const { Token } = require("./Structures/config.json");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");
//const express = require('express')
//var app = express()

client.commands = new Collection();

["Events", "Commands"].forEach((handler) => {
  require(`./Structures/Handlers/${handler}`)(client, PG, Ascii);
});

//const PORT = process.env.PORT || 3000;
//app.listen(PORT, () => {
//    console.log(`App is running on port ${ PORT }`);
//})

client.login(Token);
