const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();
const { signup, login, signupValidation, loginValidation } = require("../controllers/authController");

// 5 auth attempts per 15 minutes per IP — prevents brute force
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { response: "Too many attempts. Please try again in 15 minutes.", loginStatus: false, signupStatus: false },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/signup", authLimiter, signupValidation, signup);
router.post("/login", authLimiter, loginValidation, login);

module.exports = router;
