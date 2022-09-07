export default class Recharge {
	constructor(data) {
		let template = document.getElementById("recharge").content.cloneNode(true);

		this._id = null;

		this.$container = document.createElement("div");
		this.$container.classList.add("recharge");
		this.$container.appendChild(template);

		this.$info = this.$container.querySelector(".info");
		this.$status = this.$container.querySelector(".status");

		this.$container.addEventListener("click", () =>
			JEANGER_APP.rechargesApp.rechargesFill.openPanel(this._id)
		);

		this.fillData(data);
	}

	fillData(data) {
		let d = this.$info.querySelectorAll("div");

		this._id = data._id;

		d[0].innerHTML = data.provider;
		d[1].innerHTML = data.phoneNumber;
		d[2].innerHTML = data.amount;
	}
}
