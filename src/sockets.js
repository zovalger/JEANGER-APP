const WatchSocketController = require("./controllers/Watch.socket.controller");

module.exports = (io) => {
	io.on("connection", (socket) => {
		// todas las peticiones de escucha de los waypoints
		WatchSocketController(io, socket);
	});
};
