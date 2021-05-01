// Discord music bot

// Dependencies
const Discord = require("discord.js");
require('dotenv').config();
const wok = require('wokcommands');

const client = new Discord.Client();


// Slash commands
client.on('ready', () => {
    new wok(client, {
        commandDir: 'commands',
        testServers: ['800539900499066920', '793730357098184754'],
        showWarns: false,
    })
    .setDefaultPrefix(process.env.PREFIX)
    .setBotOwner(['274721188419207170'])
    .setMongoPath(process.env.MONGO_URI)
    .setCategorySettings([
        {
            name: 'Fun & Games',
            emoji: '🎮'
        },
        {
            name: 'Economy',
            emoji: '💸'
        },
        {
            name: 'Music',
            emoji: '🎵'
        },
        {
            name: 'Configuration',
            emoji: '🚧',
            hidden: true
        }
    ])
});

// Bot login
client.login(process.env.TOKEN);
