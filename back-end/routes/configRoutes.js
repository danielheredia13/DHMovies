import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  popularMovie,
  movieSearch,
  movieDetails,
  movieCredits,
  movieSimilar,
  movieRecommendations,
} from "../controllers/configController.js";

const router = express.Router();

router.route("/popular").get(popularMovie);

router.route("/search").post(movieSearch);

router.route("/details").post(movieDetails);

router.route("/credits").post(movieCredits);

router.route("/similar").post(movieSimilar);

router.route("/recommendations").post(movieRecommendations);

export default router;
