require("dotenv").config();
const readGpu = require("./nvidia");
const firebase = require("./firebase");

setInterval(() => {
    readGpu()
        .then((output) => {
            firebase.updateStats(output);
        })
        .catch((error) => {
            // Error reading the output
            console.error(error);
        });
}, 5000);
