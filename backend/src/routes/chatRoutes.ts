import express from "express";
import {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} from "../controllers/chatControllers";
import { verifyJWT } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").post(verifyJWT, accessChat);
router.route("/").get(verifyJWT, fetchChats);
router.route("/group").post(verifyJWT, createGroupChat);
router.route("/rename").put(verifyJWT, renameGroup);
router.route("/groupremove").put(verifyJWT, removeFromGroup);
router.route("/groupadd").put(verifyJWT, addToGroup);

export default router;
