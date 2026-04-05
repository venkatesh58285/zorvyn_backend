const FinancialRecord = require("../models/FinancialRecord");

// Create record
exports.createRecord = async (req, res) => {
  try {
    const { amount, type, category, date, note } = req.body;

    // Validation
    if (!amount || !type || !category) {
      return res
        .status(400)
        .json({ error: "Amount, type, and category are required" });
    }

    if (!["income", "expense"].includes(type)) {
      return res
        .status(400)
        .json({ error: 'Type must be "income" or "expense"' });
    }

    const record = new FinancialRecord({
      amount,
      type,
      category,
      date: date || new Date(),
      note,
      createdBy: req.user.userId,
    });

    await record.save();
    res.status(201).json({ message: "Record created", record });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all records with filtering and pagination
exports.getRecords = async (req, res) => {
  try {
    const {
      type,
      category,
      startDate,
      endDate,
      page = 1,
      limit = 10,
    } = req.query;
    let filter = {};

    if (type) filter.type = type;
    if (category) filter.category = category;
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.max(1, Math.min(100, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const records = await FinancialRecord.find(filter)
      .populate("createdBy", "name email")
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 });

    const total = await FinancialRecord.countDocuments(filter);

    res.json({
      total,
      page: pageNum,
      limit: limitNum,
      pages: Math.ceil(total / limitNum),
      records,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update record
exports.updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, type, category, date, note } = req.body;

    const record = await FinancialRecord.findById(id);
    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }

    if (amount) record.amount = amount;
    if (type) record.type = type;
    if (category) record.category = category;
    if (date) record.date = date;
    if (note) record.note = note;

    await record.save();
    res.json({ message: "Record updated", record });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete record
exports.deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const record = await FinancialRecord.findByIdAndDelete(id);
    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.json({ message: "Record deleted", record });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
