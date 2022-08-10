const ClocksModel = require("../models/Clocks.model");

const ClocksController = {
	getAll: async () => {
		const res = {};

		res.watches = await ClocksModel.find();

		return res;
	},

	updateWatch: async (data) => {
		const { watch: w } = data;

		const watch = await ClocksModel.findById(w._id);

		watch.mode = w.mode;
		watch.timesToSet = w.timesToSet;

		watch.timeSeted = w.timeSeted;

		await watch.save();

		console.log(w);
		console.log(watch);

		return { watches: [watch] };
	},

	// newWaypoint: async (data) => {
	// 	try {
	// 		const waypoint = new ClocksModel(data);

	// 		await waypoint.save();

	// 		return waypoint;
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// },
	// readAllWaypoints: async () => {
	// 	try {
	// 		const waypoints = await ClocksModel.find();

	// 		return waypoints;
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// },

	// deleteWaypoint: async (_id) => {
	// 	try {
	// 		await ClocksModel.deleteOne(_id);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// },
};

module.exports = ClocksController;
