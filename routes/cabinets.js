const express = require("express");
const router = express.Router();

// @route     GET api/cabinets
// @desc      Get all cabinets
// @access    Private
router.get("/", (req, res) => {
	res.send("Get all cabinets");
});

// @route     POST api/cabinets
// @desc      Add new cabinet
// @access    Private
router.post("/", (req, res) => {
	res.send("Add new cabinet");
});

// @route     GET api/cabinets/:id
// @desc      Get cabinet
// @access    Private
router.get("/:id", (req, res) => {
	res.send("Get cabinet");
});

// @route     PUT api/cabinets/:id
// @desc      Update cabinet
// @access    Private
router.put("/:id", (req, res) => {
	res.send("Update cabinet");
});

// @route     DELETE api/cabinets/:id
// @desc      Delete cabinet
// @access    Private
router.delete("/:id", (req, res) => {
	res.send("Delete cabinet");
});

module.exports = router;
