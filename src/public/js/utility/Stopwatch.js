// es una clase que tiene las funciones principales de un cronometro
class Stopwatch {
	constructor() {
		// es un idicador para objetos externos de la clase
		this.status = "idle";

		// cuando se inicio el contador (mientras esta en activo)
		this.startDate = 0;

		// cuanto tiempo tiene acumulado (mientras esta pausado)
		this.accumulatedTime = 0;
	}

	// ************** inicia el cronometro **************
	// pone la fecha de inicio y verifica si no estaba pausado antes
	start() {
		this.status = "running";

		this.startDate = this.startDate
			? this.startDate
			: this.accumulatedTime
			? Date.now() - this.accumulatedTime
			: Date.now();

		this.accumulatedTime = 0;
	}

	// ************** pausa el cronometro **************
	// guarda el tiempo acumulado
	pause() {
		this.status = "pause";

		this.accumulatedTime = this.startDate
			? Date.now() - this.startDate
			: this.accumulatedTime;

		this.startDate = 0;
	}

	// ************** resetea el cronometro **************
	// establese todas las variables al estado inicial
	reset() {
		this.status = "idle";
		this.startDate = 0;
		this.accumulatedTime = 0;
	}

	// ************** devuelve el tiempo del cronometro **************
	// decide si mandar el tiempo que a trascurrido desde que se inicio
	// o devuelve el tiempo acumulado
	getTime() {
		let time = this.startDate
			? Date.now() - this.startDate
			: this.accumulatedTime;

		return time;
	}

	// ************** asigna el tiempo del cronometro **************
	// se le pasa un tiempo en milisegundos y el cronometro respondera actualizandose deacuerdo a ese tiempo
	setTime(timesToSet = { dirDate, dirTime }) {
		const { dirDate, dirTime } = timesToSet;

		// this.status = "idle";

		this.startDate = dirDate;
		this.accumulatedTime = dirTime;
	}
}

export default Stopwatch;
