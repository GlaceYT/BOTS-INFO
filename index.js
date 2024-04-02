const { Client, GatewayIntentBits, ActivityType, EmbedBuilder } = require('discord.js');
const path = require('path');
const express = require('express');
require('dotenv').config();
const client = new Client({
  intents: Object.keys(GatewayIntentBits).map((a) => {
    return GatewayIntentBits[a];
  }),
});

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  const imagePath = path.join(__dirname, 'index.html');
  res.sendFile(imagePath);
});
app.listen(port, () => {
  console.log(`🔗 Listening to RTX: http://localhost:${port}`);
  console.log(`🔗 Replit URL: https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`);
});

let onlineMessage = null;

async function login() {
  try {
    await client.login(process.env.TOKEN);
    console.log('\x1b[32m%s\x1b[0m', `|    🌼 Logged in as ${client.user.username}`);
    console.log('\x1b[36m%s\x1b[0m', `|    🏡 Bot is in ${client.guilds.cache.size} servers`);
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', '❌ Failed to log in:', error);
    console.log('\x1b[31m%s\x1b[0m', '❌ Client Not Login, Restarting Process...');
    process.kill(1);
  }
}

client.once('ready', () => {
  console.log('\x1b[32m%s\x1b[0m', `|    🎯 Activity successfully set!`);
  client.user.setPresence({
    activities: [{ name: `✨ Live Updating Bot Info`, type: ActivityType.Custom }],
    status: 'idle',
  });

  
  const channelId = '1162713754048409670'; 
  client.channels.fetch(channelId).then(channel => {
    if (onlineMessage) {
      onlineMessage.delete().catch(error => console.error('Error deleting message:', error));
    }
    const showcaseEmbed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Bot Updates')
      .setDescription('🌟 Create your own custom bots watch below Guides!\n\n<a:arrow:1119532745165647902> [**YouTube Channel**](https://www.youtube.com/channel/UCPbAvYWBgnYhliJa1BIrv0A)\n<a:arrow:1119532745165647902> [**Bot Codes**](https://github.com/RTX-GAMINGG)\n<a:arrow:1119532745165647902> [**Support Server**](https://discord.gg/wP7PmbSEKM)')

      .addFields(
          { name: '**Music Bot**', value: '```diff\n-Version : v3.6    Status: Paused  ```'},
          { name: '**Multi Music Bot**', value: '```diff\n-Version : v1.5    Status: Working  ```'},
         { name: '**Ticket Bot**', value: '```diff\n-Version : v1.0    Status: Working  ```'},
        { name: '**BotGhost Status**', value: '```diff\n-Version : v2.0    Status: Working  ```'},
        { name: '**Announcement Bot**', value: '```diff\n-Version : v1.4    Status: Working  ```'},
        { name: '**Vouch Bot**', value: '```diff\n-Version : v1.1    Status: Working  ```'},

      )
      .setImage(`https://cdn.discordapp.com/attachments/1175487983915376662/1177604675919421481/LIVE_RTX_BOT_STATUS.png?`)
      .setFooter({ text: 'Thank You for Using Our Bots!❤️', iconURL: 'https://cdn.discordapp.com/attachments/1175487983915376662/1177979690800119868/RTX.png?ex=65747a14&is=65620514&hm=34bdeb2010bb43020ec944f58fcd26a8e3013a17b92f5724671953b0cfa96293&' })
      .setTimestamp();

    channel.send({ embeds: [showcaseEmbed] }).then(message => {
      onlineMessage = message;
    });
  });
});

login();

setInterval(() => {
  if (!client || !client.user) {
    console.log('\x1b[31m%s\x1b[0m', '❌ Client Not Logged in, Restarting Process...');
    process.kill(1);
  }
}, 15000);

module.exports = client;
