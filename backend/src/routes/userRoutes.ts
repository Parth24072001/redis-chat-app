import express, { Request, Response } from "express";
import {
  registerUser,
  authUser,
  allUsers,
} from "../controllers/userControllers";
import { verifyJWT } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").post(verifyJWT, allUsers);
router.route("/").get(verifyJWT, allUsers);

router.route("/signup").post(registerUser);

// Authenticate User
router.post("/login", authUser);

export default router;
