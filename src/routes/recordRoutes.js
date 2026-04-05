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

// POST /api/records - admin only
router.post("/", authorize("admin"), createRecord);

// GET /api/records - analyst and admin
router.get("/", authorize("analyst", "admin"), getRecords);

// PUT /api/records/:id - admin only
router.put("/:id", authorize("admin"), updateRecord);

// DELETE /api/records/:id - admin only
router.delete("/:id", authorize("admin"), deleteRecord);

module.exports = router;
