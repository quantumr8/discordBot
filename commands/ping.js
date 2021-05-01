const { MessageEmbed } = require('discord.js')

module.exports = {
    category: 'Configuration',
    description: 'A simple ping command!',
    testOnly: true,
    slash: true,
    callback: ({}) => {
        return 'pong!';
    }
}