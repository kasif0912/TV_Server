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
  getDashboardOverview,
} from "../../controller/movies.controller.js";
import upload from "../../middleware/multer.middleware.js";
const router = Router();

// For admin login
router.route("/admin-login").post(loginAdmin);
router.route("/admin-register").post(registerAdmin);

router.post(
  "/movies",
  isAdmin,
  upload.fields([{ name: "bannerUrl" }, { name: "thumbnailUrl" }]),
  createMovie
);
router.get("/movies", isAdmin, getAllMovies);

router.get("/movies/search", isAdmin, searchMovies);
router.get("/movies/filter", isAdmin, searchAndFilterMovies);

router.get("/movies/:id", isAdmin, getMovieById);
router.delete("/movie/delete/:id", isAdmin, deleteMovie);
router.patch(
  "/movies/update/:id",
  isAdmin,
  upload.fields([{ name: "bannerUrl" }, { name: "thumbnailUrl" }]),
  updateMovie
);

router.get("/dashboard", isAdmin, getDashboardOverview);

export default router;
