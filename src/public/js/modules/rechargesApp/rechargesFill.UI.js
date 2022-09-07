import RechargesFill from "./rechargesFill.js";
import { classActive as active } from "../../utility/toggleClass.js";

export default class RechargesFillUI extends RechargesFill {
	constructor($parent) {
		super();
		this.$container = $parent.querySelector("#recharges-fill");

		// ********************* nav
		this.$ToolSBarSection = this.$container.querySelector(".tools-bar-nav");
		this.$backExit = this.$ToolSBarSection.querySelector(".back-exit");

		this.$backExit.addEventListener("click", () =>
			JEANGER_APP.rechargesApp.rechargesFill.closePanel()
		);
	}

	receiveData(data) {
		this.fillDataInput(data);
	}

	fillDataInput(data) {}

	openPanel(_id) {
		let initiator = "rechargesFill";

		if (_id) JEANGER_APP.rechargesApp.getRecharges({ _id }, initiator);

		active(this.$container, true);
	}
	closePanel() {
		active(this.$container, false);
	}
}
