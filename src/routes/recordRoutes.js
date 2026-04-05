const express = require("express");
const {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
} = require("../controllers/recordController");
const verifyToken = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const router = express.Router();

// All routes require authentication
router.use(verifyToken);

/**
 * @swagger
 * /api/records:
 *   get:
 *     summary: Get financial records
 *     tags:
 *       - Records
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: type
 *         in: query
 *         schema:
 *           type: string
 *           enum: [income, expense]
 *       - name: category
 *         in: query
 *         schema:
 *           type: string
 *       - name: startDate
 *         in: query
 *         schema:
 *           type: string
 *           format: date
 *       - name: endDate
 *         in: query
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Records retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 pagination:
 *                   type: object
 */
router.get("/", authorize("analyst", "admin"), getRecords);

/**
 * @swagger
 * /api/records:
 *   post:
 *     summary: Create a financial record (Admin only)
 *     tags:
 *       - Records
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - type
 *               - category
 *             properties:
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               note:
 *                 type: string
 *           example:
 *             amount: 5000
 *             type: income
 *             category: Salary
 *             date: "2026-04-06"
 *             note: Monthly salary
 *     responses:
 *       201:
 *         description: Record created
 */
router.post("/", authorize("admin"), createRecord);

/**
 * @swagger
 * /api/records/{id}:
 *   put:
 *     summary: Update a record (Admin only)
 *     tags:
 *       - Records
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               note:
 *                 type: string
 *     responses:
 *       200:
 *         description: Record updated
 */
router.put("/:id", authorize("admin"), updateRecord);

/**
 * @swagger
 * /api/records/{id}:
 *   delete:
 *     summary: Delete a record (Admin only)
 *     tags:
 *       - Records
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Record deleted
 */
router.delete("/:id", authorize("admin"), deleteRecord);

module.exports = router;
