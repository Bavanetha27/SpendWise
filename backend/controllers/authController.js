const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

// ── Validation rules ──────────────────────────────────────────────────────────
exports.signupValidation = [
  body("userName").trim().notEmpty().withMessage("Username is required"),
  body("email").isEmail().normalizeEmail().withMessage("Invalid email address"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

exports.loginValidation = [
  body("email").isEmail().normalizeEmail().withMessage("Invalid email address"),
  body("password").notEmpty().withMessage("Password is required"),
];

// ── Controllers ───────────────────────────────────────────────────────────────
exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ response: errors.array()[0].msg, signupStatus: false });
  }

  try {
    let { userName, email, password } = req.body;
    email = email.trim().toLowerCase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ response: "User already exists", signupStatus: false });
    }

    // Salt rounds = 10 (was 15 — caused ~10s delays per signup)
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ userName, email, password: hashedPassword, darkMode: true });
    await user.save();

    const token = jwt.sign(
      { _id: user._id, email, userName },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );

    return res.status(201).json({ response: "Signup successful", signupStatus: true, token, email });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ response: "Email already registered", signupStatus: false });
    }
    console.error("Signup Error:", err);
    return res.status(500).json({ response: "Signup failed", signupStatus: false });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ response: errors.array()[0].msg, loginStatus: false });
  }

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ response: "User not found", loginStatus: false });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ response: "Incorrect password", loginStatus: false });

    const token = jwt.sign(
      { _id: user._id, email, userName: user.userName },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.status(200).json({ response: "Login successful", loginStatus: true, token, email, darkMode: user.darkMode });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ response: "Login failed", loginStatus: false });
  }
};
