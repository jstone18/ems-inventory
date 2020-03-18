const express = require("express");
const connectDB = require("./config/db");

// Initialize express
const app = express();

// Connect Database
connectDB();

// Initialize Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) =>
	res.json({ msg: "Welcome to the EMS Inventory API..." })
);

// Define Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/cabinets", require("./routes/cabinets"));
app.use("/api/items", require("./routes/items"));

// Development or production port variable
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
