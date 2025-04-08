import express from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  updateEvent,
} from "../controllers/eventController.js";

const router = express.Router();

router.post("/events", createEvent);
router.get("/events", getAllEvents);
router.patch("/events/:id", updateEvent);
router.delete("/event/delete/:id", deleteEvent);

export default router;
