import { Router } from "express";
import { 
    sendOtp, 
    verifyOtp, 
    loginAdmin, 
    registerAdmin 

} from "../controller/auth.controller.js";
const router = Router();


// User
router.route('/send-otp').post(sendOtp);
router.route('/verify-otp').post(verifyOtp);

// Admin
router.route('/admin-login').post(loginAdmin);
router.route('/admin-register').post(registerAdmin);


export default router;