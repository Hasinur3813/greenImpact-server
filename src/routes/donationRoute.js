import express from "express";
import {
  getAllDonations,
  saveDonation,
  deleteDonation,
} from "../controllers/DonationController.js";
import verifyToken from "../middlewares/verifyToken.js";
const router = express.Router();

router.post("/save-donation", verifyToken, saveDonation);
router.get("/get-all-donations/:id", verifyToken, getAllDonations);
router.delete("/delete/:id", verifyToken, deleteDonation);

export default router;
