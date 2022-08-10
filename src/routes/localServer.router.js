const express = require("express");
const IpModel = require("../models/ip.model");
const router = express.Router();

router.get("/LocalServer", async (req, res) => {
	const direccion = await IpModel.findOne();

	return res.redirect(`${direccion.ip}`);
});

router.post("/LocalServer", async (req, res) => {
	const direction = new IpModel.findOne();

	if (!direction) direction = new IpModel();

	direction.ip = req.body.ip;
	direction.fecha = Date.now();

	await direction.save();

	return res.status(200);
});

module.exports = router;
