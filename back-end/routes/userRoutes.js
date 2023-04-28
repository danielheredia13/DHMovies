import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  registerUser,
  loginUser,
  updateUser,
  userDetails,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(registerUser);

router.route("/login").post(loginUser);

router.route("/profile").get(protect, userDetails).put(protect, updateUser);

export default router;
