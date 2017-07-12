const _ = require('lodash');
const temperatureLimit = 70;

module.exports = {
	// Send alert after 10 occurences
	treshold: 10,
	// Cooldown after alert in minutes
	cooldown: 90,
	// Check if this condition is met
	condition: (data) => {
		// Rig has at least one GPU hotter than 70c
		return _.filter(data, (gpu) => {
			return gpu.temperature > temperatureLimit;
		}).length > 0;
	},
	// Send this message when the condition is met
	handle: (bot) => {
		return bot.send('İçimizde ' + temperatureLimit + ' derece üstünü zorlayan kartlar var. Bir bakın isterseniz: http://miner.swiftmade.co');
	}
}