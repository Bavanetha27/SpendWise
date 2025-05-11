const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require('./models/User');

dotenv.config();
const app = express();
const PORT = 3000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB Connection Successful'))
  .catch((err) => console.error('MongoDB Connection Failed:', err));

app.use(cors());
app.use(express.json());

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  console.log("Middleware triggered");
  const token = req.headers.authorization;

  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const user = jwt.verify(token, process.env.SECRET_KEY);
    req.user = user;
    next();
  } catch (error) {
    console.log("Token Error:", error);
    return res.status(403).send("Invalid or expired token");
  }
};

// Protected route
app.get('/json', verifyToken, (req, res) => {
  console.log("Inside protected route");
  res.json({ message: "Middleware passed", user: req.user.userName });
});

// SIGNUP Route
app.post("/signup", async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ response: "User already exists", signupStatus: false });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 15);

    // Save new user
    const newUser = new User({ userName, email, password: hashedPassword });
    await newUser.save(); 

    // Generate JWT
    const payload = { email: newUser.email, userName: newUser.userName };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "24h" });

    res.status(201).send({
      response: "Signup successful",
      signupStatus: true,
      token: token,
      email: email
    });

  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).send({ response: "Signup failed", signupStatus: false });
  }
});

// LOGIN Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ response: "User not found", loginStatus: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ response: "Incorrect password", loginStatus: false });
    }

    const payload = { email: user.email, userName: user.userName };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "24h" });

    res.status(200).send({
      response: "Login successful",
      loginStatus: true,
      token: token,
      email: email
    });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).send({ response: "Login failed", loginStatus: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
