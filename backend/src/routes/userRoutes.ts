import express, { Request, Response } from "express";
import {
  registerUser,
  authUser,
  allUsers,
} from "../controllers/userControllers";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").post(protect, allUsers);

router.route("/").post(registerUser);

// Authenticate User
router.post("/login", authUser);

export default router;
