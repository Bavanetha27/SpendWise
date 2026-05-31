const mdb = require('mongoose');

const expenseSchema = new mdb.Schema({
  userId: {
    type: mdb.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  amount: {
    type: Number,
    required: true,
    min: [0.01, 'Amount must be positive'],
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    default: '',
    trim: true,
  },
}, { timestamps: true });

// Compound index: all expense queries filter by userId and sort by date
expenseSchema.index({ userId: 1, date: -1 });

const Expense = mdb.model("Expense", expenseSchema);
module.exports = Expense;
