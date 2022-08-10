// import  {CronometroSocketSend} from "./Cronometro.socket.js";

// controlador interno del cronometro
class Timer {
	constructor() {
		this.endDate = 0;
		this.timeLeft = 0;
		this.status = "idle";

		// this.EndTimeout = 0; // set time out
		// this.onFinishRun = 0; // funcion al finalizar
		// this.onFinish(() => console.log("funcion terminar"));
	}

	start() {
		this.status = "running";

		this.endDate = this.endDate
			? this.endDate
			: this.timeLeft
			? Date.now() + this.timeLeft
			: Date.now();

		this.timeLeft = 0;

		// ejecutar funcion al terminar
		// let finaliza = this.endDate - Date.now();
		// this.EndTimeout = setTimeout(() => {
		// 	this.onFinishRun();
		// }, finaliza);
	}
	pause() {
		// arreglar cuando el tiempo esta negativo

		this.timeLeft = this.timeLeft ? this.timeLeft : this.endDate - Date.now();
		this.endDate = 0;

		this.status = "pause";

		clearTimeout(this.EndTimeout);
	}
	reset() {
		this.endDate = 0;
		this.timeLeft = 0;

		this.status = "idle";
	}

	getTime() {
		let time = this.endDate ? this.endDate - Date.now() : this.timeLeft;

		return time;
	}

	// asigna el tiempo (milisegundos)

	setTime(timesToSet = { dirDate, dirTime }) {
		const { dirDate, dirTime } = timesToSet;

		// this.status = "idle";

		this.endDate = dirDate;
		this.timeLeft = dirTime;
	}

	// onFinish(next) {
	// 	if (next) this.onFinishRun = next;
	// }
}

export default Timer;
