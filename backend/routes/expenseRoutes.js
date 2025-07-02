const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const { addExpense, deleteExpense, categorizeExpenses, getUserExpenses } = require("../controllers/expenseController");

router.post("/add", verifyToken, addExpense);
router.delete("/expenses/:id", verifyToken, deleteExpense);
router.post("/category", verifyToken, categorizeExpenses);
router.get('/expenses', verifyToken, getUserExpenses);


module.exports = router;
