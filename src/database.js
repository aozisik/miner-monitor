const _ = require('lodash');
const firebase = require('./firebase');

module.exports = {
	updateStats: (output) => {
		firebase.updateStats(output);
	},
	updateLogs: (output) => {
		_.each(output, (data) => {
	        firebase.logTemperature(data.id, data.temperature);
	    });
	}
}