const express = require("express");
const router = new express.Router();
const authController = require("../../controller/auth.controller");
const mediaController = require("../../controller/media.controller");

// User auth
router.post("/send-otp", authController.sendOtp);
router.post("/verify-otp", authController.verifyOtp);

// Media viewing
router.get("/allMedia", mediaController.getAllMediaData);
router.get("/by-language", mediaController.getMediaByLanguage);
router.get("/by-category", mediaController.getMediaByCategory);

module.exports = router;
