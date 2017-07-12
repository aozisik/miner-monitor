const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.TELEGRAM_ACCESS_TOKEN, {polling: true});
const chatId = process.env.TELEGRAM_CHAT_ID;

bot.sendMessage(chatId, '<table><tr><td>test</td><td>test2</td></tr></table>', {parse_mode:'html'});

module.exports = {
	send: (msg) => {
		bot.sendMessage(chatId, msg);
	},
	silent: (msg) => {
		bot.sendMessage(chatId, msg, {disable_notification: true});
	}
};
