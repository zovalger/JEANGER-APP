const WatchModel = require("../models/Watch.model");

const WatchController = {
	getAll: async () => {
		const res = {};

		res.watches = await WatchModel.find();

		return res;
	},

	updateWatch: async (data) => {
		const { watch: w } = data;

		const watch = await WatchModel.findById(w._id);

		if (w.name) watch.name = w.name;
		if (w.mode) watch.mode = w.mode;
		if (w.timesToSet) watch.timesToSet = w.timesToSet;
		if (w.timeSeted) watch.timeSeted = w.timeSeted;

		await watch.save();

		// console.log(w);
		console.log(watch);

		return { watches: [watch] };
	},

	// crear nuevo reloj

	newWatch: async (data) => {
		const { name } = data;

		const watch = new WatchModel({ name });

		// watch.name=name

		await watch.save();

		console.log(watch);

		return { watches: [watch] };
	},

	deleteWatch: async (data) => {
		const { watch } = data;

		await WatchModel.deleteOne({ _id: watch._id });

		return data
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

module.exports = WatchController;
