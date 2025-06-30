const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const {
  getProfile,
  updateProfile,
  deleteAccount
} = require("../controllers/userController");

router.get("/profile", verifyToken, getProfile);
router.put("/update", verifyToken, updateProfile);
router.delete("/deleteAccount", verifyToken, deleteAccount);

module.exports = router;
