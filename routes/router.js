const express = require("express");
const router = new express.Router();
// const authController = require("../controller/auth.controller");
const userController = require("../controller/user.controller");
const mediaController = require("../controller/media.controller");
const upload = require("../middleware/multer.middleware");

// register and login api
router.post("/send-otp", userController.sendOtp);
router.post("/verify-otp", userController.verifyOtp);
// get valid user
router.get("/getAllUser", userController.getAllUsers);
// Accepting both video and banner as form-data
// Accepting both video and banner as form-data
router.post(
  "/upload",
  upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  mediaController.createMedia
);

router.get("/allMedia", mediaController.getAllMediaData);
// Get media by language
router.get("/by-language", mediaController.getMediaByLanguage);

// Get media by category
router.get("/by-category", mediaController.getMediaByCategory);
module.exports = router;
