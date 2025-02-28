import express from "express";
import MarksController from "../app/controller/markController.js";
import { authMiddleware, checkUser } from "../middleware/authMiddleware.js";
import cache from "../utils/apiCache.js";

const router = express.Router();

router.post(
  "/postmarks",
  authMiddleware,
  checkUser(["faculty", "admin"]),
  MarksController.addMarks
);
router.get(
  "/getmarks",
  authMiddleware,
  checkUser(["faculty", "admin", "student"]),
  cache("5 minutes"),
  MarksController.getMarks
);

export default router;
