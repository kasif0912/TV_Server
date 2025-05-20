import { Router } from "express";
import { sendOtp, verifyOtp } from "../../controller/auth.controller.js";
import {
  getAllMediaData,
  getMediaByCategory,
  getMediaByLanguage,
  getVideoByid,
} from "../../controller/media.controller.js";
const router = Router();

// User
router.route("/send-otp").post(sendOtp);
router.route("/verify-otp").post(verifyOtp);

// Media viewing
router.route("/allMedia").get(getAllMediaData);
router.route("/video/:id").get(getVideoByid)
router.route("/by-language").get(getMediaByLanguage);
router.route("/by-genre").get(getMediaByCategory);

export default router;
