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

/**
 * @swagger
 * /api/dashboard/summary:
 *   get:
 *     summary: Get financial summary
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Summary data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalIncome:
 *                   type: number
 *                 totalExpense:
 *                   type: number
 *                 netBalance:
 *                   type: number
 */
router.get("/summary", getSummary);

/**
 * @swagger
 * /api/dashboard/categories:
 *   get:
 *     summary: Get category-wise breakdown
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category breakdown
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   category:
 *                     type: string
 *                   income:
 *                     type: number
 *                   expense:
 *                     type: number
 *                   recordCount:
 *                     type: integer
 */
router.get("/categories", getCategoryBreakdown);

/**
 * @swagger
 * /api/dashboard/trends:
 *   get:
 *     summary: Get monthly trends
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly trends
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   month:
 *                     type: string
 *                   income:
 *                     type: number
 *                   expense:
 *                     type: number
 */
router.get("/trends", getMonthlyTrends);

module.exports = router;
