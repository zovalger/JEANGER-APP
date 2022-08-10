const ClocksSocketController = require("./controllers/Clocks.socket.controller");

module.exports = (io) => {
	io.on("connection", (socket) => {
		// todas las peticiones de escucha de los waypoints
		ClocksSocketController(io, socket);
	});
};
