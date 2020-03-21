const { Client, MessageEmbed } = require('discord.js');
const { config } = require('dotenv');

const client = new Client({
  disableMentions: 'everyone'
})

config({
  path: `${__dirname}/.env`
});

client.on('ready', async () => {
  console.log(`Online as ${client.user.tag}`);
  // console.log(await client.generateInvite('ADMINISTRATOR'))

  client.user.setPresence({
    activity: {
      name: 'myself getting developed',
      type: 'WATCHING',
      url: 'https://github.com/Alex-Garth/TrueBot'
    },
    status: 'online',
    afk: false
  });
});

client.on('message', async message => {
  const prefix = '-';

  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd === 'ping') {
    const msg = await message.channel.send(`🏓 Pinging...`);

    msg.edit(`🏓 Pong\nLatency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms`);
  }

  if (cmd === 'say') {
    if (message.deletable) message.delete();

    if (args.length < 1)return message.channel.send(`Nothing to say, ${message.author}?`).then(m => m.delete(5000));

    const roleColor = message.guild.me.roles.highest.hexColor === '#000000' ? '#FFFFFF' : message.guild.me.roles.highest.hexColor;

    if (args[0].toLowerCase() === 'embed') {
      const embed = new MessageEmbed()
        .setColor(roleColor)
        .setDescription(args.slice(1).join(' '))
        .setAuthor(message.author.username);
      
        message.channel.send(embed);
    } else {
      message.channel.send(args.join(' '));
    }
  }
});

client.login(process.env.TOKEN);