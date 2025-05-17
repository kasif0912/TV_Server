const express = require("express");
const router = new express.Router();
const authController = require("../controller/auth.controller");
// const userController = require("../controller/user.controller");
const mediaController = require("../controller/media.controller");
const upload = require("../middleware/multer.middleware");
const isAdmin = require("../middleware/isAdmin");

// register and login api for user
router.post("/send-otp", authController.sendOtp);
router.post("/verify-otp", authController.verifyOtp);

// get all user
// router.get("/getAllUser", authController.getAllUsers);

router.get("/allMedia", mediaController.getAllMediaData);
// Get media by language
router.get("/by-language", mediaController.getMediaByLanguage);

// Get media by category
router.get("/by-category", mediaController.getMediaByCategory);

// For admin

router.post("/admin-login", authController.loginAdmin);
router.post("/admin-register", authController.registerAdmin);

// Accepting video , banner and thumbnail as form-data
router.post(
  "/upload",
  isAdmin,
  upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  mediaController.createMedia
);

router.put(
  "/update/:id",
  isAdmin,
  upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  mediaController.updateMedia
);

router.delete("/delete/:id", isAdmin, mediaController.deleteMedia);

module.exports = router;
