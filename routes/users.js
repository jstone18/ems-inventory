const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// Validation Check
const { check, validationResult } = require("express-validator/check");

const User = require("../models/User");

// @route     POST api/users
// @desc      Register user
// @access    Public
router.post(
	"/",
	[
		check("name", "Please enter a name")
			.not()
			.isEmpty(),
		check("email", "Please enter a valid email").isEmail(),
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
			// Check for existing email
			let user = await User.findOne({ email });
			if (user) {
				return user.status(400).json({ msg: "User already exists" });
			}
			// Create new user if none exists
			user = new User({
				name,
				email,
				password
			});
			// Hash password with bcrypt
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);
			// Save new user to db
			await user.save();
			// Create payload object to send in token
			const payload = {
				user: {
					id: user.id
				}
			};
			// Create token object
			jwt.sign(
				payload,
				config.get("jwtsecret"),
				{ expiresIn: 36000 },
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
