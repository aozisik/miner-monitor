const admin = require("firebase-admin");
const moment = require("moment-timezone");
const serviceAccount = require("../serviceAccount.json");

function Firebase() {
    //
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_URL
    });

    var db = admin.database();
    const latestRef = db.ref(process.env.RIG_KEY + "/latest");

    const hourlyLogRef = (gpuId) => {
        const now = moment().tz(process.env.TIMEZONE);
        const path = [
            process.env.RIG_KEY,
            "logs",
            gpuId,
            now.format("YYYY"),
            now.format("M"),
            now.format("D"),
            now.format("H")
        ];
        console.log(path.join("/"));
        return db.ref(path.join("/"));
    };

    this.updateStats = (stats) => {
        latestRef.set({
            stats: stats,
            timestamp: admin.database.ServerValue.TIMESTAMP
        });
    };

    this.logTemperature = (gpuId, temperature) => {
        const ref = hourlyLogRef(gpuId);
    };
}

module.exports = new Firebase;