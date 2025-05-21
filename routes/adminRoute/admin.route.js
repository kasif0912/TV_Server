import { Router } from "express";
import { loginAdmin, registerAdmin } from "../../controller/auth.controller.js";
import isAdmin from "../../middleware/isAdmin.js";
import {
  createMovie,
  getAllMovies,
  searchMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} from "../../controller/movies.controller.js";
import upload from "../../middleware/multer.middleware.js";
const router = Router();

// For admin login
router.route("/admin-login").post(loginAdmin);
router.route("/admin-register").post(registerAdmin);

router.post(
  "/movies",
  upload.fields([{ name: "banner" }, { name: "thumbnail" }]),
  createMovie
);
router.get("/movies", getAllMovies);
router.get("/movies/search", searchMovies);
router.get("/movies/:id", getMovieById);
router.patch(
  "/movies/:id",
  upload.fields([{ name: "banner" }, { name: "thumbnail" }]),
  updateMovie
);
router.delete("/movies/:id", deleteMovie);

export default router;
