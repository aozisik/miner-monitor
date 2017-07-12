const _ = require('lodash');
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.TELEGRAM_ACCESS_TOKEN, {polling: true});
const chatId = process.env.TELEGRAM_CHAT_ID;
let information = null;

bot.onText(/\/rig/, (msg, match) => {
	if(msg.chat.id != chatId) {
		return; // Drop foreign requests
	}
	let reply = 'Henüz ben de bilmiyorum. Daha sonra tekrar sorar mısın?';
	if(information != null) {
		reply = _.map(information, (gpu, index) => {
			return "GPU #" + index + ", Isı: " + gpu.temperature + "c, Yük: " + gpu.load;
		}).join("\n");
	}
	bot.sendMessage(chatId, reply);
});

module.exports = {
	inform: (data) => {
		information = data;
	},
	send: (msg) => {
		bot.sendMessage(chatId, msg);
	},
	silent: (msg) => {
		bot.sendMessage(chatId, msg, {disable_notification: true});
	}
};
