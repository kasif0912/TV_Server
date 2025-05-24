import { Router } from "express";
import { sendOtp, verifyOtp } from "../../controller/auth.controller.js";

import authenticate from "../../middleware/authenticate.js";
import { getAllUsersWithSubscriptions } from "../../controller/user.controller.js";
const router = Router();

// User
router.route("/send-otp").post(sendOtp);
router.route("/verify-otp").post(verifyOtp);

//
router.get("/users", getAllUsersWithSubscriptions);
// router.get("/device-access-check").get(authenticate,);

export default router;
