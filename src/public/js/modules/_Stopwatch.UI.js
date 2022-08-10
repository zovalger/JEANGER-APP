// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      clase para controlar la interfaz del cronometro
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

import { secondsToTime } from "../utility/FormatoHora.js";
import { classActive as active } from "../utility/toggleClass.js";
import StopwatchController from "./Stopwatch.Controller.js";

class StopwatchUI extends StopwatchController {
	constructor($container, _id) {
		super(_id);

		// contenedor del cronometro
		this.$container = $container
			? $container
			: document.querySelector("#stopwatch");

		// relog
		this.$clock = this.$container.querySelector(".clock");
		// partes del relog
		this.$time = this.$clock.querySelector(".time");
		this.$ms = this.$clock.querySelector(".ms");

		// botones de funciones principales
		this.$btnStart = this.$container.querySelector(".start");
		this.$btnPause = this.$container.querySelector(".pause");
		this.$btnReset = this.$container.querySelector(".reset");

		// asignacion de funcionalidades a los botones
		this.$btnStart.addEventListener("click", () => this.start());
		this.$btnPause.addEventListener("click", () => this.pause());
		this.$btnReset.addEventListener("click", () => this.reset());

		this.update = null;

		// reiniciar el estado del cronometro
		this.restoreState();
	}

	// asigna los correspondientes valores al relog
	showTime() {
		// const clock = secondsToTime(this.getTime(), true);

		// if (this.$time.innerHTML != clock.time) this.$time.innerHTML = clock.time;
		// if (this.$ms.innerHTML != clock.ms) this.$ms.innerHTML = clock.ms;

		this.$clock.innerHTML = secondsToTime(this.getTime());
	}

	// funcion que se ejecuta en cada intervalo
	updateFrame = () => {
		this.showTime();
	};

	// ************** iniciar el cronometro **************
	// establece los estados de los botones, inicia el cronometro y establece el intervalo de actualizacion
	start() {
		active(this.$btnStart, false);
		active(this.$btnReset, false);
		active(this.$btnPause, true);
		this.$btnPartial.disabled = false;

		super.start();
		this.showTime();

		clearInterval(this.update);
		this.update = setInterval(this.updateFrame, 125);
	}

	// ************** pausar el cronometro **************
	// establece los estados de los botones, pausa el cronometro y limpia el intervalo de actualizacion
	pause() {
		active(this.$btnStart, true);
		active(this.$btnPause, false);
		active(this.$btnReset, true);

		super.pause();
		this.showTime();

		clearInterval(this.update);
	}

	// ************** resetea el cronometro **************
	// establese todos los elementos al estado inicial
	reset() {
		active(this.$btnStart, true);
		active(this.$btnPause, false);
		active(this.$btnReset, false);

		super.reset();
		this.showTime();

		clearInterval(this.update);
	}

	// restablese los valores guardados que tenia el cronometro
	restoreState(_id) {
		super.restoreState(_id);

		if (this.status == "running") this.start();
		if (this.status == "pause") this.pause();
		if (this.status == "idle") this.reset();
	}
}

export default StopwatchUI;
