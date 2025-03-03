import express from "express";
import multer from "multer";
import ExcelController from "../app/controller/excelController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/export", ExcelController.exportUsers);

router.post("/import", upload.single("file"), ExcelController.importUsers);

export default router;
