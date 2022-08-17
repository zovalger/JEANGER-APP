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
import clocks from "./modules/Clocks.App.js";

// contenedor de todos los componentes de la app
window.JEANGER_APP = {};

JEANGER_APP.offLineMode = true;

// iniciamos la libreria de socket
initSockets();

JEANGER_APP.clocks = new clocks();

// *********************************************************************
//                    inicializacion de la app
// *********************************************************************

// vista de informacion de la ruta
// JEANGER_APP.routerInfo = new RouterInfoViewUI();

// console.log(Date.now());

// let w = document.querySelector(".watch");

// quitar el estatus y verificar solo timesToSet
// let dataWatch = {
// 	_id: 1,
// 	mode: "stopwatch",
// 	timesToSet: { dirDate:null, dirTime: 2000 },
// };

// 1659401654302

//

// let ob1 = {
// 	watches: [
// 		{
// 			_id: 1,
// 			mode: "stopwatch",
// 			timesToSet: { dirDate: Date.now() - 10000, dirTime: 0 },
// 		},
// 	],
// };

// JEANGER_APP.clocks.initApp(ob1);

// let update1 = {
// 	watches: [
// 		{
// 			_id: 1,
// 			mode: "stopwatch",
// 			timesToSet: { dirDate: null, dirTime: 16000 },
// 		},
// 	],
// };

// setTimeout(() => {

// 	JEANGER_APP.clocks.receiveUpdate(update1)

// }, 3000);

// let update2 = {
// 	watches: [
// 		{
// 			_id: 2,
// 			mode: "timer",
// 			timesToSet: { dirDate: Date.now()+20000, dirTime: 0 },
// 		},
// 	],
// };

// setTimeout(() => {

// 	JEANGER_APP.clocks.receiveUpdate(update2)

// }, 5000);
