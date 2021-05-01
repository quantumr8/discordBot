const { MessageEmbed } = require('discord.js')

module.exports = {
    category: 'Configuration',
    description: 'A simple ping command!',
    ownerOnly: true,
    slash: true,
    callback: ({}) => {
        return 'pong!';
    }
}
