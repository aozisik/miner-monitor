require("dotenv").config();
const firebase = require("./firebase");
const readGpu = require("./drivers/nvidia");

setInterval(() => {

	firebase.logTemperature(1);
	return;

    readGpu()
        .then((output) => {
            firebase.updateStats(output);
        })
        .catch((error) => {
            // Error reading the output
            console.error(error);
        });
}, 5000);