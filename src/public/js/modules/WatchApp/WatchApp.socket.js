// comunicaciones de los waypoints

export const WatchAppSocketSend = {
	init: () => JEANGER_APP.socket.emit("watch-app:init", {}),

	sendUpdate: (data = { watch }) =>
		JEANGER_APP.socket.emit("watch-app:send-update", data),

	newWatch: (data) => JEANGER_APP.socket.emit("watch-app:new-watch", data),

	deleteWatch: (data) =>
		JEANGER_APP.socket.emit("watch-app:delete-watch", data),
};

const WatchAppSocket = (socket) => {
	// escuchando eventos
	socket.on("watch-app:init", (data) => {
		JEANGER_APP.WatchApp.initApp(data);
	});

	socket.on("watch-app:receive-update", (data) => {
		console.log(data);
		JEANGER_APP.WatchApp.receiveUpdate(data);
	});

	socket.on("watch-app:delete-watch", (data) => {
		console.log(data);
		JEANGER_APP.WatchApp.reciveToDelete(data);
	});
};

export default WatchAppSocket;
