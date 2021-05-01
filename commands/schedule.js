const { MessageCollector } = require('discord.js');
const momentTimezone = require('moment-timezone');

module.exports = {
    category: 'Configuration',
    description: 'Scheduel a message to be sent.',
    expectedArgs: '<Channel tag> <YYYY/MM/DD> <HH:MM> <"AM" or "PM"> <Timezone>',
    minArgs: 5,
    maxArgs: 5,
    requirePermission: ['ADMINISTRATOR'],
    testOnly: true,
    slash: 'both',
    init: () => {},
    callback: async ({ message, args}) => {
        const { mentions, guild, channel } = message

        const targetChannel = mentions.channels.first()
        if(!targetChannel){
            message.reply('Please tag a channel');
            return;
        }
        args.shift()

        const [date, time, clockType, timeZone] = args
        if (clockType !== 'AM' && clockType !== 'PM') {
            message.reply(`You must provide either "AM" or "PM", you provided "${clockType}"`);
            return;
        }

        const validTimeZones = momentTimezone.tz.names()
        if (!validTimeZones.includes(timeZone)) {
            message.reply('Uknown timezone! Please use one of the following <https://gist.github.com/AlexzanderFlores/d511a7c7e97b4c4ae60cb6e562f78300>');
            return;
        }

        const targetDate = momentTimezone.tz(
            `${date} ${time} ${clockType}`,
            'YYYY-MM-DD HH:mm A',
            timeZone
        )

        message.reply('Please enter the message you would like to schedule.')

        
        const filter = (newMessage) => {
            return newMessage.author.id === message.author.id;
        }
        const collector = new MessageCollector(channel, filter, {
            max: 1,
            time: 1000 * 60 // 60 secons
        })
        collector.on('end', async (collected) => {
            const collectedMessage = collected.first();

            if(!collectedMessage) {
                message.reply('Scheduled message cancled.')
                return;
            }
            message.reply('Your message has been scheduled.');

            // TODO: Save to the database
        })


    }
}