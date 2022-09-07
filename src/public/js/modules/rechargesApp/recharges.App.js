import { RechangesAppSocketPost } from "./recharges.socket.js";

import RechargesFillUI from "./rechargesFill.UI.js";
import RechargesMainUI from "./rechargesMain.UI.js";
import RechargesNewUI from "./rechargesNew.UI.js";

const offlineData = {
	recharges: [
		{
			_id: 1,
			provider: "movilnet",
			phoneNumber: "0426-123.45.67",
			amount: 5,
		},
		{
			_id: 2,
			provider: "movistar",
			phoneNumber: "0424-987.65.43",
			amount: 6,
		},
	],
};
export default class rechargesApp {
	constructor() {
		this.$container = document.getElementById("rechargesApp");

		this.rechargesMain = new RechargesMainUI(this.$container);
		this.rechargesNew = new RechargesNewUI(this.$container);
		this.rechargesFill = new RechargesFillUI(this.$container);

		// cambiar para el servidor

		this.initApp();
	}

	initApp() {
		// array de relojes
		console.log("init");

		let receiveTo = "rechargesMain",
			query = {};

		this.getRecharges(query, receiveTo);
	}

	getRecharges(query, receiveTo) {
		if (JEANGER_APP.offLineMode)
			return this.receiveData({ rechages: offlineData.recharges, receiveTo });

		RechangesAppSocketPost.get({ receiveTo, query });
	}

	receiveData(data) {
		const { receiveTo, rechages } = data;

		const r = JEANGER_APP.offLineMode ? offlineData.recharges : rechages;

		if (receiveTo === "rechargesMain") this.rechargesMain.receiveData(r);

		if (receiveTo === "rechargesFill") this.rechargesFill.receiveData(r);
	}

	create(rechage) {
		if (this.rechages[rechage._id]) return this.updateWatch(rechage);

		let w = new WatchUI(rechage);
		this.rechages[rechage._id] = w;
		this.$watches.appendChild(w.$container);
	}

	updateWatch(watch) {
		if (!this.rechages[watch._id]) return this.create(watch);

		console.log("update");
		this.rechages[watch._id].restoreState(watch);
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
