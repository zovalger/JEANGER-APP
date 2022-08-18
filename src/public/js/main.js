// ********************************************************************
// preguntar si primero queremos ir a la version local antes de  cargar los scripts
// ********************************************************************

if (
	window.location.origin === "http://jeanger-app.herokuapp.com" ||
	window.location.origin === "https://jeanger-app.herokuapp.com"
) {
	let goto = confirm(
		"Usa la version local si estas dentro del ciber\n ¿quieres ir a la version local?"
	);

	console.log(goto);
	if (goto) window.location.href = `${window.location}localserver`;
}

import initSockets from "./socket.js";
import clocksApp from "./modules/Clocks.App.js";

// ********************************************************************
//  											inicio de la app
// ********************************************************************

// ****************** contenedor de todos los componentes y clases de la app
window.JEANGER_APP = {};

// ****************** modo fuera de linea (para desarrollo)

// JEANGER_APP.offLineMode = true;

// ****************** iniciamos la libreria de socket
initSockets();

// ********************************************************************
// 			 inicio de todas las secciones de la app la libreria de socket
// ********************************************************************

JEANGER_APP.clocksApp = new clocksApp();
