// comunicaciones de los waypoints

export const ClockAppSocketSend = {
	init: () => {
		JEANGER_APP.socket.emit("clock-app:init", {});
	},
	sendUpdate: (data = { watch }) => {
		JEANGER_APP.socket.emit("clock-app:send-update", data);
	},
};

const ClockAppSocket = (socket) => {
	// escuchando eventos
	socket.on("clock-app:init", (data) => {
		JEANGER_APP.clocksApp.initApp(data);
	});

	socket.on("clock-app:receive-update", (data) => {
		JEANGER_APP.clocksApp.receiveUpdate(data);
	});
};

export default ClockAppSocket;
