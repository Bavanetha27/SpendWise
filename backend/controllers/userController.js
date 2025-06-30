const User = require("../models/User");
const Expense = require("../models/Expense");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      userName: user.userName,
      email: user.email,
      phone: user.phone,
      darkMode: user.darkMode,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateProfile = async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const updated = await User.findByIdAndUpdate(
      req.user._id,
      { userName: name, email, phone },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "User not found" });

    res.json({
      userName: updated.userName,
      email: updated.email,
      phone: updated.phone,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user._id;
    await Expense.deleteMany({ userId });
    const deleted = await User.findByIdAndDelete(userId);
    if (!deleted) return res.status(404).json({ message: "User not found" });

    res.json({ message: 'Account deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
