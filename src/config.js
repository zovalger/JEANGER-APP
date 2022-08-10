const { config } = require("dotenv");
config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;
const TestMode = process.env.TestMode;

const LOCALSERVER = process.env.LOCALSERVER;

module.exports = { MONGODB_URI, PORT, TestMode, LOCALSERVER };
