import { ClockAppSocketSend } from "./Clocks.socket.js";
import WatchUI from "./Watch.UI.js";

const offlineData = {
	watches: [
		{
			_id: 1,
			mode: "stopwatch",
			timesToSet: { dirDate: 0, dirTime: 0 },
		},
		{
			_id: 2,
			mode: "timer",
			timesToSet: { dirDate: 0, dirTime: 0 },
		},
		// {
		// 	_id: 3,
		// 	mode: "stopwatch",
		// 	timesToSet: { dirDate: 0, dirTime: 0 },
		// },
		// {
		// 	_id: 4,
		// 	mode: "timer",
		// 	timesToSet: { dirDate: 0, dirTime: 0 },
		// },
		// {
		// 	_id: 5,
		// 	mode: "stopwatch",
		// 	timesToSet: { dirDate: 0, dirTime: 0 },
		// },
		// {
		// 	_id: 6,
		// 	mode: "timer",
		// 	timesToSet: { dirDate: 0, dirTime: 0 },
		// },
		// {
		// 	_id: 7,
		// 	mode: "stopwatch",
		// 	timesToSet: { dirDate: 0, dirTime: 0 },
		// },
		// {
		// 	_id: 8,
		// 	mode: "timer",
		// 	timesToSet: { dirDate: 0, dirTime: 0 },
		// },
		// {
		// 	_id: 9,
		// 	mode: "stopwatch",
		// 	timesToSet: { dirDate: 0, dirTime: 0 },
		// },
		// {
		// 	_id: 10,
		// 	mode: "timer",
		// 	timesToSet: { dirDate: 0, dirTime: 0 },
		// },
	],
};

export default class rechargesApp {
	constructor() {
		this.$container = document.getElementById("rechargesApp");
		// this.$watches = this.$container.querySelector('#clocks-app-watches')

		// // console.log(this.$container);

		// this.watchs = {};

		// JEANGER_APP.offLineMode
		// 	? this.initApp(offlineData)
		// 	: ClockAppSocketSend.init();
	}

	createWatch(watch) {
		if (this.watchs[watch._id]) return this.updateWatch(watch);

		console.log("create");
		let w = new WatchUI(watch);
		this.watchs[watch._id] = w;
		this.$watches.appendChild(w.$container);
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
		data.watches.map((watch) => {
			this.updateWatch(watch);
		});
	}

	sendUpdate(watch) {
		if (JEANGER_APP.offLineMode) return;
		
		console.log("enviar actualizacion");
		console.log(watch);

		let ob = {
			user: "yo",

			watch,
		};

		ClockAppSocketSend.sendUpdate(ob);
		// let r = {
		// 	watches: [ob.watch],
		// };

		// this.receiveUpdate(r);
	}

	// update(dataWatch) {}
	// createWatch(dataWatch) {}
	// delete(dataWatch) {}
}
