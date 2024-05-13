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

  
  const channelId = '1175487983915376662'; 
  client.channels.fetch(channelId).then(channel => {
    if (onlineMessage) {
      onlineMessage.delete().catch(error => console.error('Error deleting message:', error));
    }
    const showcaseEmbed = new EmbedBuilder()
      .setColor('#b406c0')
       .setAuthor({
      name: 'Bot Stats',
      iconURL: 'https://cdn.discordapp.com/attachments/1230824451990622299/1230824519220985896/6280-2.gif?ex=66433a28&is=6641e8a8&hm=6d1c2b3622d46c17c1b8bdfccdb6494d04f91db72c9a17dcf91ea67112d5e336&',
      url: 'https://discord.gg/xQF9f9yUEM'
    })
      .setDescription('🌟 Create your own custom bots watch below Guides!\n\n<a:arrow:1119532745165647902> [**YouTube Channel**](https://www.youtube.com/channel/UCPbAvYWBgnYhliJa1BIrv0A)\n<a:arrow:1119532745165647902> [**Bot Codes**](https://github.com/GlaceYT)\n<a:arrow:1119532745165647902> [**Support Server**](https://discord.gg/xQF9f9yUEM)')

      .addFields(
          { name: '**Multi Musix Bot [ Preifx Bot ]**', value: '```diff\n-Version : v1.7    Status: Working  ```'},
           { name: '**Prime Music Bot [ Slash Command Lavalink ]**', value: '```diff\n-Version : v1.0    Status: Working  ```'},
          { name: '**Music Bot [ Slash Command YTDL ]**', value: '```diff\n-Version : v3.6    Status: Paused  ```'},
           { name: '**Welcome Bot [ Slash Command Bot ]**', value: '```diff\n-Version : v1.0    Status: Working  ```'},
         { name: '**Ticket Bot [ Slash Command Bot ]**', value: '```diff\n-Version : v1.0    Status: Working  ```'},
        { name: '**BotGhost Status [ Script ]**', value: '```diff\n-Version : v2.0    Status: Working  ```'},
        { name: '**Announcement Bot [ Prefix Bot ]**', value: '```diff\n-Version : v2.0    Status: Working  ```'},
        { name: '**Vouch Bot [ Prefix Bot]**', value: '```diff\n-Version : v1.1    Status: Working  ```'},

      )
      .setImage(`https://cdn.discordapp.com/attachments/1113800537402527903/1236803979996958740/11.png?ex=66433a37&is=6641e8b7&hm=e22d648c9664dc4a1b62fcb8de541cc3188229b366dc0641892268a103ce533b&`)
      .setFooter({ text: 'Thank You for Using Our Bots!❤️', iconURL: 'https://cdn.discordapp.com/attachments/1113800537402527903/1239609375635673128/Untitled_design.png?ex=66438bb1&is=66423a31&hm=6315904ca16646257f412a6391c89c7ea0450513802a7f7b068a5dbd9528f5da&' })
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
