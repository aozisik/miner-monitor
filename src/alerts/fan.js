const _ = require('lodash');

module.exports = {
	// Send alert after 3 occurences
	treshold: 1,
	// Cooldown after alert in minutes
	cooldown: 5,
	// Check if this condition is met
	condition: (data) => {
		// Rig has at least one GPU with 0 fan
		return _.filter(data, (gpu) => {
			return !parseInt(gpu.fan);
		}).length > 0;
	},
	// Send this message when the condition is met
	handle: (bot) => {
		bot.send('Çalışmayan fanlar var. Çok tehlikeli!');
	}
}