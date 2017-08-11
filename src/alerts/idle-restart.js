const _ = require('lodash');
const Shell = require("../shell");

module.exports = {
	// Send alert after 10 occurences
	treshold: 60,
	// Cooldown after alert in minutes
	cooldown: 1,
	// Check if this condition is met
	condition: (data) => {
		// Rig has at least one GPU with 0 load
		return _.filter(data, (gpu) => {
			return !parseInt(gpu.load);
		}).length > 0;
	},
	// Send this message when the condition is met
	handle: (bot) => {
		bot.send('Sizden hayır yok. Kendime res atıyorum');
		Shell('sudo restart').run();
	}
}