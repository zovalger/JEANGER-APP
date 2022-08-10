const app = require("./app");
const { Server: WebsocketServer } = require("socket.io");
const http = require("http");
const sockets = require("./sockets");

const { connectDB } = require("./db");
const { PORT, LOCALSERVER } = require("./config");
const {  sendUrl } = require("./utils/sendUrl");

connectDB()
	.then(() => {
		const server = http.createServer(app);
		const httpServer = server.listen(PORT);
		const io = new WebsocketServer(httpServer);

		sockets(io);

		if (LOCALSERVER) sendUrl();
	})
	.catch(() => {
		console.log("error en conectar con la base de datos");
	});
