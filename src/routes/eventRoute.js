import express from "express";
import {
  createEvent,
  getAllEvents,
  updateEvent,
} from "../controllers/eventController.js";

const router = express.Router();

router.post("/events", createEvent);
router.get("/events", getAllEvents);
router.patch("/events/:id", updateEvent);

export default router;
