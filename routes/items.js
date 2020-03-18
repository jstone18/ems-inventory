const express = require("express");
const router = express.Router();

// @route     GET api/items
// @desc      Get all items
// @access    Private
router.get("/", (req, res) => {
	res.send("Get all items");
});

// @route     POST api/items
// @desc      Add new item
// @access    Private
router.post("/", (req, res) => {
	res.send("Add new item");
});

// @route     GET api/items/:id
// @desc      Get item
// @access    Private
router.get("/:id", (req, res) => {
	res.send("Get item");
});

// @route     PUT api/items/:id
// @desc      Update item
// @access    Private
router.put("/:id", (req, res) => {
	res.send("Update item");
});

// @route     DELETE api/items/:id
// @desc      Delete item
// @access    Private
router.delete("/:id", (req, res) => {
	res.send("Delete item");
});

module.exports = router;
