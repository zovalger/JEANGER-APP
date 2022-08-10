const mongoose = require("mongoose");

const IpSchema = mongoose.Schema({
	// let data1 = {
	// 	_id: 1,
	// 	mode: "stopwatch",
	// 	timesToSet: { dirDate: null, dirTime: 0 },
	// };

	urlServer: { type: String },

	fecha: { type: Date, default: Date.now() },
});

IpSchema.method({
	a: async function () {},
});

const IpModel = mongoose.model("ip", IpSchema);

module.exports = IpModel;
