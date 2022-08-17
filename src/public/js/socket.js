import ClockAppSocket from "./modules/Clocks.socket.js";
// import WaypointsSocket from "./modules/Waypoints.socket.js";

const initSockets = () => {
	if (JEANGER_APP.offLineMode) return;

	// añadir coneccion a la app
	const socket = io();

	JEANGER_APP.socket = socket;

	// WaypointsSocket(socket);
	ClockAppSocket(socket);
};

export default initSockets;
