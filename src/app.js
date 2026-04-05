require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const recordRoutes = require("./routes/recordRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const errorHandler = require("./middleware/errorHandler");
const {
  generalLimiter,
  authLimiter,
  apiLimiter,
} = require("./middleware/rateLimiter");

connectDB();

const app = express();

// Middleware
app.use(express.json());

// Rate limiting
app.use(generalLimiter); // Apply to all routes
app.use("/api/auth", authLimiter); // Stricter limit for auth

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Zorvyn Backend API" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

module.exports = app;
