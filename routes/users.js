const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// Validation check
const { check, validationResult } = require("express-validator/check");

const User = require("../models/User");

// @route     POST api/users
// @desc      Register a user
// @access    Public
router.post(
	"/",
	[
		check("name", "Name enter a name")
			.not()
			.isEmpty(),
		check("email", "Please include a valid email").isEmail(),
		check(
			"password",
			"Please enter a password with 6 or more characters"
		).isLength({ min: 6 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;

		try {
			// Check if user email already exists
			let user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({ msg: "User already exists" });
			}

			// Create new User if none exists
			user = new User({
				name,
				email,
				password
			});

			// Hash Password with bCrypt
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			// Save new User to db
			await user.save();

			// Create payload object to send in token
			const payload = {
				user: {
					id: user.id
				}
			};

			// create token object
			jwt.sign(
				payload,
				config.get("jwtSecret"),
				{
					expiresIn: 360000
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

module.exports = router;
