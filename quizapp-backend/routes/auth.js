const express = require("express");

const router = express.Router();

// controllers
const {
  signup,
  signin,
  forgotPassword,
  resetPassword,
  uploadImage,
  requireSignin,
  updatePassword,
  userProfile,
} = require("../controllers/auth");

//Routes path
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/upload-image", requireSignin, uploadImage);
router.post("/update-password", requireSignin, updatePassword);
router.get("/user-profile/:userId", userProfile);

module.exports = router;
