require('dotenv').config();
const _ = require('lodash');
const alerts = require('./alerts');
const database = require('./database');
const readGpu = require('./drivers/nvidia');

const logFrequency = parseInt(process.env.LOG_FREQUENCY * 60 * 1000);
const updateFrequency = parseInt(process.env.UPDATE_FREQUENCY) * 1000;
// Throttle the update logs function
database.updateLogs = _.throttle(database.updateLogs, logFrequency);

function mainLoop() {
    readGpu()
        .then((output) => {
            alerts.ping(output);
            database.updateLogs(output);
            database.updateStats(output);
        }).catch((error) => {
            // Log error...
            console.error('Error occured: ' + error);
        });
};

setInterval(mainLoop, updateFrequency);
