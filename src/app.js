require("dotenv").config();
const express = require("express");

const app = express();

// Middleware
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Zorvyn Backend API" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
