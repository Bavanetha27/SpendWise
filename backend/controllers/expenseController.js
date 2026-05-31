const axios = require("axios");
const { body, validationResult } = require("express-validator");
const Expense = require("../models/Expense");

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://localhost:8000";

// ── Validation rules ──────────────────────────────────────────────────────────
exports.addExpenseValidation = [
  body("amount").isFloat({ gt: 0 }).withMessage("Amount must be a positive number"),
  body("category").trim().notEmpty().withMessage("Category is required"),
  body("date").isISO8601().withMessage("Invalid date format"),
];

// ── Controllers ───────────────────────────────────────────────────────────────
exports.addExpense = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { amount, category, date, description } = req.body;
  try {
    const newExpense = new Expense({
      userId: req.user._id,
      amount,
      category: category.trim(),
      description: description ? description.trim() : "",
      date,
    });

    const saved = await newExpense.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Add Expense Error:", err);
    res.status(500).json({ message: "Error saving expense" });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const deleted = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!deleted) return res.status(404).json({ message: "Expense not found or unauthorized" });

    res.json({ message: "Expense deleted successfully" });
  } catch (err) {
    console.error("Delete Expense Error:", err);
    res.status(500).json({ error: "Failed to delete expense" });
  }
};

// Get all expenses for logged-in user, sorted newest first
exports.getUserExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user._id }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    console.error("Get Expenses Error:", err);
    res.status(500).json({ error: "Error fetching expenses" });
  }
};

// ML Integration — calls FastAPI service over HTTP (no subprocess spawning)
exports.categorizeExpenses = async (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const mlResponse = await axios.post(`${ML_SERVICE_URL}/predict`, { text }, { timeout: 15000 });
    const expenses = mlResponse.data;

    if (!Array.isArray(expenses) || expenses.length === 0) {
      return res.status(422).json({ error: "No expenses could be extracted from the text" });
    }

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
    if (err.code === "ECONNREFUSED" || err.code === "ERR_BAD_RESPONSE") {
      return res.status(503).json({ error: "ML service is unavailable. Please try again later." });
    }
    console.error("ML Error:", err.message);
    res.status(500).json({ error: "Failed to categorize expenses" });
  }
};
