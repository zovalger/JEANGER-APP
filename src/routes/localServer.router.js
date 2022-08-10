const express = require("express");
const IpModel = require("../models/ip.model");
const router = express.Router();

router.get("/", async (req, res) => {
	const direccion = await IpModel.findOne();

	console.log(direccion);

	return res.redirect(`http://${direccion.ip}`);
});

router.post("/", async (req, res) => {
	const direction = new IpModel.findOne();

	if (!direction) direction = new IpModel();

	direction.ip = req.body.ip;
	direction.fecha = Date.now();

	await direction.save();

	return res.status(200);
});

module.exports = router;
