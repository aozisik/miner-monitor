require("dotenv").config();
const _ = require("lodash");
const firebase = require("./firebase");
const readGpu = require("./drivers/nvidia");

const updateFrequency = parseInt(process.env.UPDATE_FREQUENCY) * 1000;
const logCycles = parseInt(process.env.LOG_FREQUENCY * 60 * 1000) / updateFrequency; 
// Initialize logCycle
let logCycle = logCycles;

function mainLoop() {
    readGpu()
        .then((output) => {
        	updateLogs(output);
            updateStats(output);
        }).catch((error) => {
            // Log error...
            console.error("Error occured: " + error);
        });
};

function updateStats(output) {
    firebase.updateStats(output);
}

function updateLogs(output) {
	if (logCycle < logCycles) {
		++logCycle;
		return;
	}
	logCycle = 0;
    _.each(output, (data) => {
        firebase.logTemperature(data.id, data.temperature);
    });	
}

setInterval(mainLoop, updateFrequency);
