const Expense = require("../models/Expense");
const runPythonModel = require("../utils/runPythonModel");

exports.addExpense = async (req, res) => {
  const { amount, category, date, description } = req.body;
  try {
    const newExpense = new Expense({
      userId: req.user._id,
      amount,
      category,
      description,
      date
    });

    const saved = await newExpense.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Error saving expense" });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const deleted = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!deleted) return res.status(404).json({ message: 'Expense not found or unauthorized' });

    res.json({ message: 'Expense deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete expense' });
  }
};

// ML Integration for categorizing bulk expenses
exports.categorizeExpenses = async (req, res) => {
  const { text } = req.body;

  if (!text) return res.status(400).json({ error: "Text is required" });

  try {
    const expenses = await runPythonModel(text);

    const formattedExpenses = expenses.map(exp => ({
      userId: req.user._id,
      amount: exp.amount,
      category: exp.category,
      description: (exp.description || "").replace(/[^a-zA-Z0-9\s.,]/g, "").trim(),
      date: exp.date ? new Date(exp.date) : new Date(),
    }));

    const saved = await Expense.insertMany(formattedExpenses);
    res.json(saved);
  } catch (err) {
    console.error("ML Error:", err);
    res.status(500).json({ error: "Failed to categorize expenses" });
  }
};
