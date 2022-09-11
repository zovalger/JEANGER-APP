import WatchAppSocket from "./modules/WatchApp/WatchApp.socket.js";
// import WaypointsSocket from "./modules/Waypoints.socket.js";

const initSockets = () => {
	if (JEANGER_APP.offLineMode) return;

	// añadir coneccion a la app
	const socket = io();

	JEANGER_APP.socket = socket;

	// WaypointsSocket(socket);
	WatchAppSocket(socket);
};

export default initSockets;
