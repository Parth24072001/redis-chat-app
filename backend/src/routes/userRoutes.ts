import express from "express";
import {
  registerUser,
  authUser,
  allUsers,
  getCurrentUser,
} from "../controllers/userControllers";
import { verifyJWT } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").post(verifyJWT, allUsers);
router.route("/").get(verifyJWT, allUsers);
router.route("/me").get(verifyJWT, getCurrentUser);

router.route("/signup").post(registerUser);

router.post("/login", authUser);

export default router;
