const _ = require('lodash');

module.exports = {
	// Send alert after 5 occurences
	treshold: 5,
	// Cooldown after alert in minutes
	cooldown: 30,
	// Check if this condition is met
	condition: (data) => {
		// Rig has at least one GPU with 0 load
		return _.filter(data, (gpu) => {
			return !parseInt(gpu.load);
		}).length > 0;
	},
	// Send this message when the condition is met
	handle: (bot) => {
		return bot.send(_.shuffle([
			'En az bir GPU %0 yükte. Sistem boş boş yatıyor sanki?',
			'Beyler, biri el atsın en az bir kart boşta şu an.',
		])[0]);
	}
}