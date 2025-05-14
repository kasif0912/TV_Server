const express = require("express");
const router = new express.Router();
// const authController = require("../controller/auth.controller");
const userController = require("../controller/user.controller");
// const authenticate = require("../middleware/authenticate");
const upload = require("../middleware/multer.middleware");
const { createMedia } = require("../controller/media.controller");

// register and login api
router.post("/send-otp", userController.sendOtp);
router.post("/verify-otp", userController.verifyOtp);
// get valid user
router.get("/getAllUser", userController.getAllUsers);
// Accepting both video and banner as form-data
router.post(
  "/upload",
  upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  createMedia
);
module.exports = router;
