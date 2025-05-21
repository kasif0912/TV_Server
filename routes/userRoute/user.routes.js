import { Router } from "express";
import { sendOtp, verifyOtp } from "../../controller/auth.controller.js";

import authenticate from "../../middleware/authenticate.js";
const router = Router();

// User
router.route("/send-otp").post(sendOtp);
router.route("/verify-otp").post(verifyOtp);

export default router;
