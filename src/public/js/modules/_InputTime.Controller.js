import {  milisecondsToTime } from "../utility/milisecondsToTime.js";
import { classActive as active } from "../utility/toggleClass.js";

export default class InputTime {
	constructor($parent, stiqueta) {
		// this.time = 0;

		this.pordefecto = [300000, 600000, 900000, 1200000, 1800000, 3600000];

		this.$container = $parent.querySelector(stiqueta);

		this.$inputs = this.$container.querySelectorAll("input");
		this.$timersList = this.$container.querySelector(".timers-list");
		this.$donw = this.$container.querySelector(".dropdonw");

		this.$donw.addEventListener("click", () => {
			console.log("dropdonw");
			active(this.$timersList);
		});

		for (const input of this.$inputs) {
			input.addEventListener("input", () => {
				this.getTime();
			});
		}

		this.$timersList.innerHTML = "";

		for (const valuesoftime of this.pordefecto) {
			let textime = milisecondsToTime(valuesoftime);

			let item = document.createElement("div");
			item.innerHTML = textime;

			let times = textime.match(/\d{1,}/g).reverse();

			item.addEventListener("click", () => {
				active(this.$timersList);

				this.$inputs[2].value = times[0] ? times[0] : 0;
				this.$inputs[1].value = times[1] ? times[1] : 0;
				this.$inputs[0].value = times[2] ? times[2] : 0;
			});

			this.$timersList.appendChild(item);
		}
	}

	getTime() {
		let hours = parseInt(this.$inputs[0].value),
			minutes = parseInt(this.$inputs[1].value),
			seconds = parseInt(this.$inputs[2].value);

		hours = hours ? hours * 60 * 60 * 1000 : 0;
		minutes = minutes ? minutes * 60 * 1000 : 0;
		seconds = seconds ? seconds * 1000 : 0;

		let time = hours + minutes + seconds;
		// console.log(`${hours}:${minutes}:${seconds}`);
		// time;

		return time;
	}
}
