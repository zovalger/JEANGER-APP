const mongoose = require("mongoose");

const WatchSchema = mongoose.Schema({
	name: { type: String },

	mode: { type: String, default: "stopwatch" },
	
	timesToSet: {
		dirDate: { type: Number, default: 0 },
		dirTime: { type: Number, default: 0 },
	},
	timeSeted: { type: Number, default: 0 },
});

WatchSchema.method({
	a: async function () {},
});

const WatchModel = mongoose.model("watch", WatchSchema);

module.exports = WatchModel;
