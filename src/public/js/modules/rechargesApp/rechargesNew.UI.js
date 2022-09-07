import { classActive as active } from "../../utility/toggleClass.js";
import RechargesNew from "./rechargesNew.js";

export default class RechargesNewUI extends RechargesNew {
	constructor($parent) {
    super()
		this.$container = $parent.querySelector("#recharges-new");



        // ********************* nav
		this.$ToolSBarSection = this.$container.querySelector(".tools-bar-nav");
		this.$backExit = this.$ToolSBarSection.querySelector(".back-exit");

		this.$backExit.addEventListener("click", () =>
			JEANGER_APP.rechargesApp.rechargesNew.closePanel()
		);
	}
  openPanel(){
    active(this.$container,true)
  }
  closePanel(){
    active(this.$container,false)

  }
}
