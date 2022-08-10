const express = require("express");
const IpModel = require("../models/ip.model");
const router = express.Router();

router.get("/", async (req, res) => {
	const direccion = await IpModel.findOne();

	console.log(direccion);

	if (direccion) return res.redirect(direccion.urlServer);

	setTimeout(() => {
		res.redirect(`/localserver`);
	}, 2000);
});

router.post("/", async (req, res) => {
	let direction = await IpModel.findOne();

	if (!direction) direction = new IpModel();

	direction.urlServer = req.body.urlServer;
	direction.fecha = Date.now();

	await direction.save();

	return res.json({ok:true});
});

module.exports = router;
