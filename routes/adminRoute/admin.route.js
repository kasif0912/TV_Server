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
  searchAndFilterMovies,
} from "../../controller/movies.controller.js";
import upload from "../../middleware/multer.middleware.js";
const router = Router();

// For admin login
router.route("/admin-login").post(loginAdmin);
router.route("/admin-register").post(registerAdmin);

router.post(
  "/movies",
  upload.fields([{ name: "bannerUrl" }, { name: "thumbnailUrl" }]),
  createMovie
);
router.get("/movies", getAllMovies);
router.get("/movies/:id", getMovieById);
router.delete("/movie/delete/:id", deleteMovie);
router.patch(
  "/movies/update/:id",
  upload.fields([{ name: "bannerUrl" }, { name: "thumbnailUrl" }]),
  updateMovie
);


router.get("/movies/search", searchMovies);
router.get("/movies/filter", searchAndFilterMovies);

export default router;
