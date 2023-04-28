import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  favoriteMoviesUser,
  favoriteMovieAdd,
  favoriteMovieDelete,
} from "../controllers/movieController.js";

const router = express.Router();

router.route("/favorite").get(protect, favoriteMoviesUser);

router.route("/favorite/add").post(protect, favoriteMovieAdd);

router.route("/favorite/delete").post(protect, favoriteMovieDelete);

export default router;
