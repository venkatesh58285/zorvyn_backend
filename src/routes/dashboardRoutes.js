const express = require("express");
const {
  getSummary,
  getCategoryBreakdown,
  getMonthlyTrends,
} = require("../controllers/dashboardController");
const verifyToken = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const router = express.Router();

// All routes require authentication and viewer/analyst/admin role
router.use(verifyToken);
router.use(authorize("viewer", "analyst", "admin"));

// GET /api/dashboard/summary
router.get("/summary", getSummary);

// GET /api/dashboard/categories
router.get("/categories", getCategoryBreakdown);

// GET /api/dashboard/trends
router.get("/trends", getMonthlyTrends);

module.exports = router;
