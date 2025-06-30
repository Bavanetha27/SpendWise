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
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
});

const Expense = mdb.model("Expense", expenseSchema);

module.exports = Expense;
