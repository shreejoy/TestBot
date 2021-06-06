const Discord = require('discord.js');
const {
  Telegraf
} = require('telegraf');

const telegram_token = process.env.TELEGRAM_TOKEN;
const discord_token = process.env.DISCORD_TOKEN;

const telegram_client = new Telegraf(telegram_token);
const discord_client = new Discord.Client({
  ws: {
    intents: new Discord.Intents(Discord.Intents.ALL)
  }
});

discord_client.once('ready', async () => {
  console.log('Ready!');
});

discord_client.on("message", function(message) {
  if (message.author.bot) return;
  if (message.content != '!test') return;
  message.reply('Hello from replit.com')
});

telegram_client.on('message', (ctx) => {
  ctx.reply("Hello from replit.com");
});


discord_client.login(discord_token);
telegram_client.launch()

process.once('SIGINT', () => {
  discord_client.destroy();
  telegram_client.stop('SIGINT');
});

process.once('SIGTERM', () => {
  discord_client.destroy();
  telegram_client.stop('SIGTERM');
});
