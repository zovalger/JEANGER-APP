const WatchController = require("./Watch.Controller");

const WatchSocketController = (io, socket) => {
	socket.on("watch-app:init", async (data) => {
		socket.emit("watch-app:init", await WatchController.getAll());
	});

	socket.on("watch-app:send-update", async (data) => {
		const res = await WatchController.updateWatch(data);
		
		socket.broadcast.emit("watch-app:receive-update", res);
	});

	// recibir dato para crear nuevo reloj
	socket.on("watch-app:new-watch", async (data) => {
		const res = await WatchController.newWatch(data);
		io.emit("watch-app:receive-update", res);
	});

	// recibir dato para eliminar nuevo reloj
	socket.on("watch-app:delete-watch", async (data) => {
		const res = await WatchController.deleteWatch(data);

		io.emit("watch-app:delete-watch", res);
	});

	// eliminar una parada
	socket.on("waypoint:delete", async (_id) => {
		const waypoints = await WatchController.deleteWaypoint(_id);

		io.emit("waypoint:delete", waypoints);
	});
};

module.exports = WatchSocketController;
