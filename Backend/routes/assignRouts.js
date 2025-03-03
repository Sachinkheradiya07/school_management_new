import express from "express";
import AssignController from "../app/controller/assignClassSub.js";
import { checkUser, authMiddleware } from "../middleware/authMiddleware.js";
import cache from "../utils/apiCache.js";

const router = express.Router();
router.post(
  "/student",
  authMiddleware,
  checkUser("admin"),
  AssignController.assignStudent
);
router.post(
  "/faculty",
  authMiddleware,
  checkUser("admin"),
  AssignController.assignFaculty
);
router.get(
  "/student-assignments/:studentId",
  authMiddleware,
  checkUser("admin"),
  cache("5 minutes"),
  AssignController.getStudentAssignments
);
router.get(
  "/faculty-assignments/:facultyId",
  authMiddleware,
  checkUser("admin"),
  cache("5 minutes"),
  AssignController.getFacultyAssignments
);

export default router;
