const mdb = require('mongoose');

const UserSchema = new mdb.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true, // Explicit index for fast lookups
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    default: 0,
  },
  darkMode: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const User = mdb.model("user", UserSchema);
module.exports = User;