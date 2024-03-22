import express from "express";
import { allMessages, sendMessage } from "../controllers/messageControllers";
import { verifyJWT } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/:chatId").get(verifyJWT, allMessages);
router.route("/").post(verifyJWT, sendMessage);

export default router;
