const mongoose = require("mongoose");

const ClocksSchema = mongoose.Schema({
	// let data1 = {
	// 	_id: 1,
	// 	mode: "stopwatch",
	// 	timesToSet: { dirDate: null, dirTime: 0 },
	// };

	mode: { type: String },
	timesToSet: { dirDate: Number, dirTime: Number },
	timeSeted: Number,
});

ClocksSchema.method({
	a: async function () {},
});

const ClocksModel = mongoose.model("watch", ClocksSchema);

module.exports = ClocksModel;
