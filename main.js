// Discord music bot

// Dependencies
const Discord = require("discord.js");
require('dotenv').config();
const WOKCommands = require('wokcommands');

const client = new Discord.Client();


// Slahs commands
client.on('ready', () => {
    new WOKCommands(client, {
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
            // You can change the default emojis as well
            // "Configuration" is ⚙ by default
            name: 'Configuration',
            emoji: '🚧',
            // You can also hide a category from the help menu
            // Admins bypass this
            hidden: true
        }
    ])
});

// Bot login
client.login(process.env.TOKEN);
