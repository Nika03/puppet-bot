const { Client, Collection } = require("discord.js");
const client = new Client({ intents: 32767 });
const { Token, port } = require("./Structures/config.json");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");
const express = require("express");
var app = express();

client.commands = new Collection();
client.buttons = new Collection();

["Events", "Commands", "Buttons"].forEach((handler) => {
  require(`./Structures/Handlers/${handler}`)(client, PG, Ascii);
});

app.get("/", (request, response) => {
  return response.sendFile("index.html", { root: "." });
});

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);

client.login(Token);
