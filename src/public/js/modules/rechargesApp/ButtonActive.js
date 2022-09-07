import { classActive as active } from "../../utility/toggleClass.js";

class ButtonActive {
	constructor(btn, panel, btnClose) {
		this.$btn = null;
		this.$panel = null;

		this.$btn = typeof btn !== "string" ? btn : document.querySelector(btn);
		this.$panel =
			typeof panel !== "string" ? panel : document.querySelector(panel);

		if (btnClose)
			this.$btnClose =
				typeof btnClose !== "string"
					? btnClose
					: document.querySelector(btnClose);

		this.$btn.addEventListener("click", () => active(this.$panel));
	}
}

export default ButtonActive;
