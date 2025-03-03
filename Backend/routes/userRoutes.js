import express from "express";
import UserController from "../app/controller/userController.js";
import cache from "../utils/apiCache.js";
import { authMiddleware, checkUser } from "../middleware/authMiddleware.js";
import { updateUserSchema, validateUser } from "../middleware/joiValidation.js";

const router = express.Router();

router.get(
  "/getall",
  authMiddleware,
  checkUser("admin"),
  cache("5 minutes"),
  validateUser(updateUserSchema),
  UserController.getAllUser
);
router.get(
  "/get/:id",
  authMiddleware,
  checkUser("admin"),
  cache("5 minutes"),
  UserController.getUserById
);
router.put(
  "/update/:id",
  authMiddleware,
  checkUser("admin"),
  UserController.updateUser
);
router.delete(
  "/delete/:id",
  authMiddleware,
  checkUser("admin"),
  UserController.deleteUser
);
router.get(
  "/agegroup",
  authMiddleware,
  checkUser("admin"),
  cache("5 minutes"),
  UserController.getAgeGroupCounts
);
router.get(
  "/pdf/:id",
  authMiddleware,
  checkUser("admin"),
  cache("5 minutes"),
  UserController.generateUserPDF
);
router.post("/invoice", UserController.generateInvoice);

export default router;
