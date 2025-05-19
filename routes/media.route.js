import { Router } from "express";
const router = Router();
import {
    createMedia,
    deleteMedia,
    getAllMediaData,
    getMediaByCategory,
    getMediaByLanguage,
    updateMedia,
} from "../controller/media.controller.js";
import upload from "../middleware/multer.middleware.js";
import isAdmin from "../middleware/isAdmin.js";



router.route("/allMedia").get(getAllMediaData);
router.route("/by-language").get(getMediaByLanguage);
router.route("/by-category").get(getMediaByCategory);
router.route("/upload").post(isAdmin, upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
]), createMedia);
router.route("/update/:id").put(isAdmin, upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
]), updateMedia);
router.route("/delete/:id").delete(isAdmin, deleteMedia);

export default router;