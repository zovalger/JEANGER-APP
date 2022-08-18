import Stopwatch from "../utility/Stopwatch.js";
import Timer from "../utility/Timer.js";

class WatchController {
	constructor() {
		this._id = Date.now();
		this.mode = "stopwatch";
		this.nameWatch = "reloj";

		// solo cuando es timer
		this.timeSeted = 0;

		this.stopwatch = new Stopwatch();
		this.timer = new Timer();

		// this.timer.onFinish = this.onFinishTimer;
	}

	onFinishTimer() {
		// this.timer.onFinish = () => {
			console.log(this);
			// alert(`${this.nameWatch}: tiempo terminado`);
		// };
	};
	// 192.168.1.102:5500/src/public/index.html
	switch() {
		this.mode = this.mode == "stopwatch" ? "timer" : "stopwatch";
		// this.sendUpdate()
	}

	start() {
		if (this.mode == "stopwatch") this.stopwatch.start();
		if (this.mode == "timer") this.timer.start();

		this.sendUpdate();
	}
	pause() {
		if (this.mode == "stopwatch") this.stopwatch.pause();
		if (this.mode == "timer") this.timer.pause();

		this.sendUpdate();
	}
	reset() {
		if (this.mode == "stopwatch") this.stopwatch.reset();
		if (this.mode == "timer") this.timer.reset();

		this.sendUpdate();
	}

	getTime() {
		return this.mode == "stopwatch"
			? this.stopwatch.getTime()
			: this.timer.getTime();
	}

	setTime(timesToSet = { dirDate, dirTime }, timeSeted = Number) {
		if (this.mode === "timer") {
			this.timer.setTime(timesToSet);

			this.timeSeted = timeSeted;

			return;
		}

		this.stopwatch.setTime(timesToSet);
	}

	getTimeSeted() {
		return this.mode == "stopwatch"
			? {
					dirDate: this.stopwatch.startDate,
					dirTime: this.stopwatch.accumulatedTime,
			  }
			: {
					dirDate: this.timer.endDate,
					dirTime: this.timer.timeLeft,
			  };
	}

	restoreState(dataWatch) {
		const { _id, mode, timesToSet, timeSeted } = dataWatch;

		this._id = _id;
		this.mode = mode;
		this.timeSeted = timeSeted;
		this.nameWatch = dataWatch.name;
		// this.status = status;

		this.setTime(timesToSet, timeSeted);
	}

	sendUpdate() {
		let data1 = {
			_id: this._id,
			mode: this.mode,
			timesToSet: this.getTimeSeted(),
			timeSeted: this.mode == "timer" ? this.timeSeted : "",
		};

		console.log(data1);

		JEANGER_APP.clocksApp.sendUpdate(data1);
	}
}

export default WatchController;
