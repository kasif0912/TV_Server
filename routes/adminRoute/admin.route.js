import { Router } from "express";
import { loginAdmin, registerAdmin } from "../../controller/auth.controller.js";
import isAdmin from "../../middleware/isAdmin.js";
import {
  createMedia,
  deleteMedia,
  getAllMediaData,
  updateMedia,
} from "../../controller/media.controller.js";
import upload from "../../middleware/multer.middleware.js";
const router = Router();

// For admin login
router.route("/admin-login").post(loginAdmin);
router.route("/admin-register").post(registerAdmin);

// upload
router.route("/upload").post(
  isAdmin,
  upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  createMedia
);

// allMovie
router.route("/allMedia").get(getAllMediaData);

// update
router.route("/update/:id").put(
  isAdmin,
  upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  updateMedia
);

// delete
router.route("/delete/:id").delete(isAdmin, deleteMedia);

export default router;
