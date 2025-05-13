const express = require("express");
const router = new express.Router();
// const authController = require("../controller/auth.controller");
const userController= require("../controller/user.controller")
// const authenticate = require("../middleware/authenticate");

// register and login api
router.post("/send-otp", userController.sendOtp);
router.post("/verify-otp", userController.verifyOtp);
// get valid user
// router.get("/getuser", authenticate, userController.getUser);


module.exports = router;
