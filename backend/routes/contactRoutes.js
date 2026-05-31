const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const contactController = require('../controllers/contactController');

// 3 contact submissions per hour per IP
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: { message: "Too many messages sent. Please try again in an hour." },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/contact', contactLimiter, contactController.saveContact);

module.exports = router;
