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

var queryParams = [
	"index",
	"name",
	"temperature.gpu",
	"clocks.current.video"
];

var formatParams = [
	"csv",
	"noheader"
];

var command = "nvidia-smi --query-gpu="
	+ queryParams.join(",")
	+ " --format=" + formatParams.join(",");

setInterval(function() {
	shell.exec(command, function(code, stdout, stderr) {
		ref.set(stdout);	
	});
}, 5000);
