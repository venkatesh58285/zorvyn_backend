const FinancialRecord = require("../models/FinancialRecord");

// Summary: Total income, expense, and balance
exports.getSummary = async (req, res) => {
  try {
    const income = await FinancialRecord.aggregate([
      { $match: { type: "income" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const expense = await FinancialRecord.aggregate([
      { $match: { type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalIncome = income[0]?.total || 0;
    const totalExpense = expense[0]?.total || 0;
    const netBalance = totalIncome - totalExpense;

    res.json({
      totalIncome,
      totalExpense,
      netBalance,
      lastUpdated: new Date(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Category-wise breakdown
exports.getCategoryBreakdown = async (req, res) => {
  try {
    const breakdown = await FinancialRecord.aggregate([
      {
        $group: {
          _id: "$category",
          income: {
            $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] },
          },
          expense: {
            $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] },
          },
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { total: -1 } },
    ]);

    res.json({ categories: breakdown });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Monthly trends
exports.getMonthlyTrends = async (req, res) => {
  try {
    const trends = await FinancialRecord.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          income: {
            $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] },
          },
          expense: {
            $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] },
          },
          net: {
            $sum: {
              $cond: [
                { $eq: ["$type", "income"] },
                "$amount",
                { $multiply: ["$amount", -1] },
              ],
            },
          },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
    ]);

    res.json({ trends });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
