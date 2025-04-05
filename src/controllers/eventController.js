import Event from "../models/Event.js";

export const createEvent = async (req, res, next) => {
  const event = req.body;

  try {
    const newEvent = new Event(event);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    next(error);
  }
};

export const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};
