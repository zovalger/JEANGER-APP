import Recharge from "./Recharge.js";
import RechargesMain from "./rechargesMain.js";

export default class RechargesMainUI extends RechargesMain {
	constructor($parent) {
		super();

		this.$container = $parent.querySelector("#recharges-main");

		this.$content = this.$container.querySelector(".content");

		this.rechargeData = {};

		// ********************* nav
		this.$ToolSBarSection = this.$container.querySelector(".tools-bar-nav");
		this.$btnAdd = this.$ToolSBarSection.querySelector(".btn-add");

		this.$btnAdd.addEventListener("click", () =>
			JEANGER_APP.rechargesApp.rechargesNew.openPanel()
		);




		// llenar datos

	}

	// array
	receiveData(data){
		data.map((recharge) => {
			this.addRechargeToList(recharge);
		});
	}

	addRechargeToList(data) {
		let recharge = new Recharge(data);

		this.rechargeData[recharge._id] = recharge;

		this.$content.appendChild(recharge.$container);
	}
}
