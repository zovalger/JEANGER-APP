var net = require("net");
const { PORT } = require("../config");

function getNetworkIP(callback) {
	var socket = net.createConnection(80, "www.google.com");
	socket.on("connect", function () {
		callback(undefined, socket.address().address);
		socket.end();
	});
	socket.on("error", function (e) {
		callback(e, "error");
	});
}

const sendUrl = () => {
	getNetworkIP(function (error, ip) {
		console.log(ip);

		var request = require("request");
		var options = {
			method: "POST",
			url: "https://jeanger-app.herokuapp.com/localserver",
			headers: {},
			formData: {
				urlServer: `http://${ip}:${PORT}`,
			},
		};

		request(options, function (error, response) {
			if (error) throw new Error(error);
			console.log(response.body);
		});

		if (error) {
			console.log("error:", error);
		}
	});
};

module.exports = { sendUrl };
