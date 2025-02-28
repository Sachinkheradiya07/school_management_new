import DistanceController from "../app/controller/cityController.js";
import express from "express";
const router = express.Router();

router.post("/distence", DistanceController.calculateDistance);
router.post("/distence_db", DistanceController.getDistance);

export default router;
