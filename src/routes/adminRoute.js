import express from "express";

import verifyToken from "../middlewares/verifyToken.js";
import { adminOverview } from "../controllers/adminController.js";
const router = express.Router();

router.get("/overview", adminOverview);
export default router;
