import {
	addZero,
	milisecondsToObject,
	milisecondsToTime,
} from "../../utility/milisecondsToTime.js";
import { timeTomiliseconds } from "../../utility/timeTomiliseconds.js";
import { classActive as active } from "../../utility/toggleClass.js";

import WatchController from "./Watch.Controller.js";

class WatchUI extends WatchController {
	constructor(dataWatch) {
		super();

		this.update = null;

		// this.$container = container ? container : document.querySelector(".watch");
		this.$content = document
			.getElementById("watch-template")
			.content.cloneNode(true);

		this.$container = document.createElement("div");
		this.$container.classList.add("watch", "stopwatch");
		this.$container.appendChild(this.$content);

		this.$name = this.$container.querySelector(".name");
		this.$nameInput = this.$container.querySelector(".name-input");
		this.$delayed = this.$container.querySelector(".delayed");
		this.$clock = this.$container.querySelector(".clock");
		this.$timeSetedContainer = this.$container.querySelector(".time-seted");
		this.$setTime = this.$container.querySelector(".set-time");

		this.$btnDelete = this.$container.querySelector(".delete");
		this.$btnSwitch = this.$container.querySelector(".switch");
		this.$btnStart = this.$container.querySelector(".start");
		this.$btnPause = this.$container.querySelector(".pause");
		this.$btnReset = this.$container.querySelector(".reset");

		this.$setTime.addEventListener("submit", (e) => {
			e.preventDefault();
			this.start();
		});

		// asignacion de funcionalidades a los botones

		this.$nameInput.addEventListener("change", () => {
			let name = this.$nameInput.value.trim();

			this.nameWatch = name;
			this.$name.innerHTML = name;

			console.log("cambiado");

			JEANGER_APP.WatchApp.sendUpdate({ name, _id: this._id });
		});

		this.$btnDelete.addEventListener("click", () => this.delete());
		this.$btnSwitch.addEventListener("click", () => this.switch());
		this.$btnStart.addEventListener("click", () => this.start());
		this.$btnPause.addEventListener("click", () => this.pause());
		this.$btnReset.addEventListener("click", () => this.reset());

		if (dataWatch) this.restoreState(dataWatch);
		this.timer.onFinish = this.onFinishTimer;
	}
	onFinishTimer = () => {
		// console.log(this);
		this.$container.classList.add("complete");
		active(this.$delayed, true);

		super.onFinishTimer();
	};
	// asigna los correspondientes valores al relog
	showTime() {
		this.$clock.innerHTML = milisecondsToTime(this.getTime(), true).time;
	}

	// funcion que se ejecuta en cada intervalo
	updateFrame = () => {
		this.showTime();
	};

	switch() {
		console.log("cambio de relog");

		super.switch();

		this.cambiarAparaciencia();

		this.reset();
	}

	cambiarAparaciencia(mode) {
		let m = mode ? mode : this.mode;

		if (m == "stopwatch") {
			active(this.$delayed, false);
			this.$container.classList.add("stopwatch");

			this.$container.classList.remove("timer");
			this.$btnSwitch.querySelector("span").innerHTML = "hourglass_empty";
		}

		if (m == "timer") {
			this.$container.classList.add("timer");
			this.$container.classList.remove("stopwatch");
			this.$btnSwitch.querySelector("span").innerHTML = "timer";
		}
	}

	start() {
		if (this.mode === "timer" && !this.getTime()) {
			const time = this.getValuesFormTimer();
			this.setTime(
				{
					dirDate: null,
					dirTime: time,
				},
				time
			);
		}

		super.start();

		this.startState();
	}

	pause() {
		super.pause();

		this.pauseState();
	}

	reset() {
		super.reset();

		this.resetState();
	}

	startState() {
		this.isStart = true;

		active(this.$btnStart, false);
		active(this.$btnPause, true);
		this.$btnReset.disabled = true;
		this.$btnSwitch.disabled = true;

		console.log("start");
		if (this.mode === "timer") {
			active(this.$setTime, false);
			active(this.$timeSetedContainer, true);
			active(this.$clock, true);

			console.log("timer start");

			this.$timeSetedContainer.innerHTML = milisecondsToTime(
				this.timeSeted,
				true
			).time;
		}

		clearInterval(this.update);

		// this.update = setInterval(this.updateFrame, 1000);
	}

	pauseState() {
		this.isStart = false;

		active(this.$btnStart, true);
		active(this.$btnPause, false);
		active(this.$btnReset, true);
		this.$btnReset.disabled = false;

		this.$btnSwitch.disabled = false;

		if (this.mode === "timer") {
			this.$container.classList.remove("complete");
			// active(this.$delayed, false);
		}

		this.showTime();

		clearInterval(this.update);
	}

	resetState() {
		this.isStart = false;

		active(this.$btnStart, true);
		active(this.$btnPause, false);
		active(this.$btnReset, true);

		if (this.mode === "timer") {
			active(this.$setTime, true);
			active(this.$timeSetedContainer, false);
			active(this.$clock, false);
			active(this.$delayed, false);

			this.getValuesFormTimer();
			this.$container.classList.remove("complete");
		}

		this.showTime();

		clearInterval(this.update);
	}

	getValuesFormTimer() {
		if (this.mode != "timer") return;

		let hrs = parseFloat(this.$setTime.hrs.value),
			mins = parseFloat(this.$setTime.mins.value),
			secs = parseFloat(this.$setTime.secs.value);

		console.log(hrs, mins, secs);
		let time = timeTomiliseconds({ hrs, mins, secs });

		return time;
	}

	setValuesFormTimer(ms) {
		const timeOb = milisecondsToObject(ms);

		// this.$setTime.hrs.value = addZero(timeOb.hrs);
		// this.$setTime.mins.value = addZero(timeOb.mins);
		// this.$setTime.secs.value = addZero(timeOb.secs);

		this.$setTime.hrs.value = timeOb.hrs;
		this.$setTime.mins.value = timeOb.mins;
		this.$setTime.secs.value = timeOb.secs;
	}

	restoreState(dataWatch) {
		let { dirTime, dirDate } = dataWatch.timesToSet;
		super.restoreState(dataWatch);

		dirDate
			? this.startState()
			: dirTime
			? this.pauseState()
			: this.resetState();

		if (dataWatch.mode === "timer") {
			this.setValuesFormTimer(dataWatch.timeSeted);
		}

		// visualizacion de modo

		this.$name.innerHTML = this.nameWatch;
		this.$nameInput.value = this.nameWatch;
		this.cambiarAparaciencia(dataWatch.mode);

		// asignaerle a los imputs el valor que viene del servidor
	}

	enableEdit(s) {
		active(this.$btnDelete, s);
		active(this.$nameInput, s);
		active(this.$name, !s);

		// this.$btnReset.disabled = s;
		this.$btnPause.disabled = s;
		this.$btnStart.disabled = s;
		// this.$btnSwitch.disabled = s;
	}

	delete() {
		let res = confirm(
			`seguro que quieres eliminar el relog '${this.nameWatch}'`
		);

		if (res) super.delete();
	}
}

export default WatchUI;
