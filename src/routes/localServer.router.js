const express = require("express");
const IpModel = require("../models/ip.model");
const router = express.Router();

router.get("/", async (req, res) => {
	const direccion = await IpModel.findOne();

	console.log(direccion);

	if (direccion) return res.redirect(`http://${direccion.ip}`);

	setTimeout(() => {
		res.redirect(`/localserver`);
	}, 2000);
});

router.post("/", async (req, res) => {
	const direction = await IpModel.findOne();

	if (!direction) direction = new IpModel();

	direction.ip = req.body.ip;
	direction.fecha = Date.now();

	await direction.save();

	return res.status(200);
});

module.exports = router;
