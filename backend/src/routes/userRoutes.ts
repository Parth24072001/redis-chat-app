import express, { Request, Response } from "express";
import {
  registerUser,
  authUser,
  allUsers,
} from "../controllers/userControllers";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").get(protect, (req: Request, res: Response) => {
  allUsers(req, res);
});

router.route("/").post((req: Request, res: Response) => {
  registerUser(req, res);
});

router.post("/login", (req: Request, res: Response) => {
  authUser(req, res);
});

export default router;
