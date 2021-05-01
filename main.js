// Discord music bot

// Dependencies
const Discord = require("discord.js");
require('dotenv').config();
const WOKCommands = require('wokcommands');

const guildID = '800539900499066920';
const client = new Discord.Client();


// Slahs commands
client.on('ready', () => {
    new WOKCommands(client, {
        commandDir: 'commands',
        testServers: [guildID],
        showWarns: false,
    });
});


// Commands
client.on('message', (Discord, client, message) => {
    const prefix = process.env.PREFIX;

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) ||
        client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    try {
        command.execute(message, args, cmd, client, Discord);
    } catch (err) {
        message.reply("There was an error trying to execute this command!");
        console.log(err);
    }
});


// Bot login
client.login(process.env.TOKEN);
