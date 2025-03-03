import AuthController from "../app/controller/authController.js";
import express from "express";
import uploads from "../utils/multer.js";
import {
  userValidationSchema,
  validateUser,
  loginUserSchema,
} from "../middleware/joiValidation.js";
const router = express.Router();

router.post(
  "/register",
  uploads.single("profileimage"),
  validateUser(userValidationSchema),
  AuthController.register
);
router.post("/login", validateUser(loginUserSchema), AuthController.login);

export default router;
