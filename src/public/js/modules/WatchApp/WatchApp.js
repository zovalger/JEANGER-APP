import { WatchAppSocketSend } from "./WatchApp.socket.js";
import WatchUI from "./Watch.UI.js";

const offlineData = {
	watches: [
		{
			_id: 1,
			name: "pc 1",
			mode: "stopwatch",
			timesToSet: { dirDate: 0, dirTime: 0 },
		},
		{
			_id: 2,
			name: "pc 2",

			mode: "timer",
			timesToSet: { dirDate: Date.now(), dirTime: 0 },
		},
		{
			_id: 3,
			mode: "stopwatch",
			timesToSet: { dirDate: 0, dirTime: 0 },
		},
		{
			_id: 4,
			mode: "timer",
			timesToSet: { dirDate: 0, dirTime: 0 },
		},
		{
			_id: 5,
			mode: "stopwatch",
			timesToSet: { dirDate: 0, dirTime: 0 },
		},
		{
			_id: 6,
			mode: "timer",
			timesToSet: { dirDate: 0, dirTime: 0 },
		},
		{
			_id: 7,
			mode: "stopwatch",
			timesToSet: { dirDate: 0, dirTime: 0 },
		},
	],
};

export default class WatchApp {
	constructor() {
		this.watchs = {};
		this.isEditing = false;

		this.$container = document.getElementById("watch-app");
		this.$watchList = this.$container.querySelector("#watch-list");

		this.$btnAdd = this.$container.querySelector(".add");
		this.$btnEdit = this.$container.querySelector(".edit");

		this.$btnAdd.addEventListener("click", () => this.newWatch());
		this.$btnEdit.addEventListener("click", () => {
			this.$btnEdit.classList.toggle("select");
			this.isEditing = !this.isEditing;
			this.enableEditing(this.isEditing);
		});

		this.$watchList.innerHTML = "";

		// TODO: variable para el set interval

		this.intervalRefresh = null;

		JEANGER_APP.offLineMode
			? this.initApp(offlineData)
			: WatchAppSocketSend.init();

		this.open();
	}
	open() {
		// TODO: poner el is-active y activar la actualizacion de relojes
		this.Refresh();
	}

	close() {
		// TODO: quitar el is-active y la actualizacion de relojes
		this.RefreshStop();
	}

	toRefresh() {
		// TODO: si estan activos actualizarlos
		// TODO: que se actualicen los relojes

		for (const _id in this.watchs) {
			if (Object.hasOwnProperty.call(this.watchs, _id)) {
				const watch = this.watchs[_id];

				if (watch.isStart) watch.showTime()
			}
		}

		// this.watchs.map((watch) => );
	}

	// actualizacion de los relojes
	Refresh() {
		if (this.intervalRefresh) return;
		this.intervalRefresh = setInterval(() => {
			this.toRefresh();
		}, 999);
	}

	// detener la actualizacion de los relojes
	RefreshStop() {
		if (!this.intervalRefresh) return;
		clearInterval(this.intervalRefresh);
		this.intervalRefresh = null;
	}

	createWatch(watch) {
		if (this.watchs[watch._id]) return this.updateWatch(watch);
		// console.log(watch);

		console.log("create");
		let w = new WatchUI(watch);
		console.log(w);
		this.watchs[watch._id] = w;
		this.$watchList.appendChild(w.$container);
	}

	updateWatch(watch) {
		if (!this.watchs[watch._id]) return this.createWatch(watch);

		console.log("update");
		this.watchs[watch._id].restoreState(watch);
	}

	initApp(data) {
		// array de relojes
		console.log("init");
		console.log(data);

		data.watches.map((watch) => {
			this.createWatch(watch);
		});
	}

	receiveUpdate(data) {
		console.log(data);
		data.watches.map((watch) => {
			this.updateWatch(watch);
		});

		this.enableEditing();
	}

	sendUpdate(watch) {
		if (JEANGER_APP.offLineMode) return;

		console.log("enviar actualizacion");
		console.log(watch);

		let ob = {
			user: "yo",
			watch,
		};

		WatchAppSocketSend.sendUpdate(ob);
	}

	newWatch() {
		const name = prompt("Nombre del reloj", "reloj ##");

		if (!name) return;

		WatchAppSocketSend.newWatch({ name });
	}

	enableEditing(s) {
		let editin = s | this.isEditing;

		for (const _id in this.watchs) {
			if (Object.hasOwnProperty.call(this.watchs, _id)) {
				const watch = this.watchs[_id];
				watch.enableEdit(editin);
			}
		}
	}

	sendToDelete(_id) {
		const data = { watch: { _id } };
		WatchAppSocketSend.deleteWatch(data);
	}

	reciveToDelete(data) {
		console.log(data);
		this.watchs[data.watch._id].$container.remove();
	}
}
