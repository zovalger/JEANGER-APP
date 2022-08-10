const ClocksController = require("./Clocks.Controller");

const ClocksSocketController = (io, socket) => {
	socket.on("clock-app:init", async (data) => {
		socket.emit("clock-app:init", await ClocksController.getAll());
	});

	socket.on("clock-app:send-update", async (data) => {
		const res = await ClocksController.updateWatch(data);

		socket.broadcast.emit("clock-app:receive-update", res);
	});

	// eliminar una parada
	socket.on("waypoint:delete", async (_id) => {
		const waypoints = await ClocksController.deleteWaypoint(_id);

		io.emit("waypoint:delete", waypoints);
	});
};

module.exports = ClocksSocketController;
