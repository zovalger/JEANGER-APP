// comunicaciones de los waypoints

export const RechangesAppSocketPost = {
	init: () => {
		JEANGER_APP.socket.emit("rechanges-app:init", {});
	},
	get: (toSend = { query, receiveTo }) => {
		JEANGER_APP.socket.emit("rechanges-app:get", toSend);
	},
	sendUpdate: (data = { watch }) => {
		JEANGER_APP.socket.emit("rechanges-app:send-update", data);
	},
};

// escuchando eventos
const RechargesAppSocket = (socket) => {
	socket.on("clock-app:init", (data) => {
		JEANGER_APP.rechargesApp.initApp(data);
	});

	socket.on("clock-app:get", (data) => {
		JEANGER_APP.clocksApp.receiveUpdate(data);
	});


	socket.on("clock-app:receive-update", (data) => {
		JEANGER_APP.clocksApp.receiveUpdate(data);
	});
};

export default RechargesAppSocket;
