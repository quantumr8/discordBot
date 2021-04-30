// Discord music bot

// Dependencies
const Discord = require("discord.js");
require('dotenv').config();

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})

// Bot login
client.login(process.env.TOKEN);
