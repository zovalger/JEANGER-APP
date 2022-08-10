const { connect } = require("mongoose");
const { MONGODB_URI, TestMode } = require("./config");
// export const mongoose = require("mongoose");

const url = TestMode == "true" ? "mongodb://localhost/test" : MONGODB_URI;

const connectDB = async () => {
	try {
		await connect(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		});

		console.log("conectado a mongodb");

		// require("./controllers/test.controller.js");
		// require("./controllers/agregation.test")
	} catch (error) {
		console.log("no se pudo conectar a mongodb");
		console.log(error);
		setTimeout(() => {
			connectDB();
		}, 5000);
	}
};

module.exports = { connectDB };
