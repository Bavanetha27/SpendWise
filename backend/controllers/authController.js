const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.signup = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ response: "User already exists", signupStatus: false });

    const hashedPassword = await bcrypt.hash(password, 15);
    const user = new User({ userName, email, password: hashedPassword, darkMode: true });
    await user.save();

    const token = jwt.sign({ _id: user._id, email, userName }, process.env.SECRET_KEY, { expiresIn: "24h" });

    res.status(201).json({ response: "Signup successful", signupStatus: true, token, email });
  } catch (err) {
    res.status(500).json({ response: "Signup failed", signupStatus: false });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ response: "User not found", loginStatus: false });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ response: "Incorrect password", loginStatus: false });

    const token = jwt.sign({ _id: user._id, email, userName: user.userName }, process.env.SECRET_KEY, { expiresIn: "24h" });

    res.status(200).json({ response: "Login successful", loginStatus: true, token, email, darkMode: user.darkMode });
  } catch (err) {
    res.status(500).json({ response: "Login failed", loginStatus: false });
  }
};
