const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccount.json");

function Firebase() {
	//
	admin.initializeApp({
	    credential: admin.credential.cert(serviceAccount),
	    databaseURL: process.env.FIREBASE_URL
	});

	var db = admin.database();
	const latestRef = db.ref(process.env.RIG_KEY + '/latest');

	this.updateStats = (stats) => {
		latestRef.set({
			stats: stats,
			timestamp: admin.database.ServerValue.TIMESTAMP
		});
	};
}

module.exports = new Firebase;