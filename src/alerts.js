const alerts = {};
const _ = require('lodash');
const telegram = require('./telegram');

function loadAlert(name) {
	alerts[name] = require('./alerts/' + name);
	alerts[name].handle = _.throttle(alerts[name].handle, alerts[name].cooldown * 60000);
	alerts[name].checks = 0;
}

loadAlert('fan');
loadAlert('idle');
loadAlert('temperature');

module.exports = {
	ping: (data) => {
		_.each(alerts, (alert) => {
			if(alert.condition(data)) {
				alert.checks++;
			} else {
				alert.checks = 0;
			}
			if(alert.checks > alert.treshold) {
				alert.handle(telegram);
				alert.checks = 0;
			}
		});
	}
};