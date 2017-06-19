var shell = require('shelljs');
var admin = require("firebase-admin");
var serviceAccount = require("../serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dwarven-miners.firebaseio.com"
});

var db = admin.database();
var ref = db.ref('rig1/stats');

ref.set({
	test: "hello world"
});

setInterval(function() {

	var cmd = shell.exec("nvidia-smi --query-gpu=index,name,temperature.gpu,clocks.current.video --format=csv");
	console.log(cmd);

}, 5000);
