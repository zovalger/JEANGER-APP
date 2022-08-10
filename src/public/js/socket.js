import ClockAppSocket from "./modules/Clocks.socket.js";
// import WaypointsSocket from "./modules/Waypoints.socket.js";

const socket = io();

const initSockets = () => {
	// añadir coneccion a la app

	JEANGER_APP.socket = socket;

	// WaypointsSocket(socket);
	ClockAppSocket(socket)

};

export default initSockets;
