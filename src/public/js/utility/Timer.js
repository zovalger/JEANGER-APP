// import  {CronometroSocketSend} from "./Cronometro.socket.js";

// controlador interno del cronometro
class Timer {
	constructor() {
		this.endDate = 0;
		this.timeLeft = 0;

		this.onFinish = () => alert("temporizador finalizado");

		this.timeoutEnt = null;
		// this.EndTimeout = 0; // set time out
		// this.onFinishRun = 0; // funcion al finalizar
		// this.onFinish(() => console.log("funcion terminar"));
	}

	start() {

		this.endDate = this.endDate
			? this.endDate
			: this.timeLeft
			? Date.now() + this.timeLeft
			: Date.now();

		this.timeLeft = 0;

		this.setTimeOnFinish();
	}

	pause() {
		// arreglar cuando el tiempo esta negativo

		this.timeLeft = this.timeLeft ? this.timeLeft : this.endDate - Date.now();
		this.endDate = 0;


		clearTimeout(this.timeoutEnt);
	}
	reset() {
		this.endDate = 0;
		this.timeLeft = 0;

		clearTimeout(this.timeoutEnt);
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

		if (dirDate) this.setTimeOnFinish();
	}

	setTimeOnFinish() {
		this.timeoutEnt = setTimeout(() => this.onFinish(), this.getTime());
	}
}

export default Timer;
