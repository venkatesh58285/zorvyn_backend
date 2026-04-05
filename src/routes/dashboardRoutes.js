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
 *     summary: Get financial summary (total income, expense, net balance)
 *     tags:
 *       - Dashboard Analytics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Summary retrieved successfully
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
 *       401:
 *         description: Unauthorized
 */
router.get("/summary", getSummary);

/**
 * @swagger
 * /api/dashboard/categories:
 *   get:
 *     summary: Get category-wise income and expense breakdown
 *     tags:
 *       - Dashboard Analytics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category breakdown retrieved successfully
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
 *       401:
 *         description: Unauthorized
 */
router.get("/categories", getCategoryBreakdown);

/**
 * @swagger
 * /api/dashboard/trends:
 *   get:
 *     summary: Get monthly income and expense trends
 *     tags:
 *       - Dashboard Analytics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly trends retrieved successfully
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
 *       401:
 *         description: Unauthorized
 */
router.get("/trends", getMonthlyTrends);

module.exports = router;
