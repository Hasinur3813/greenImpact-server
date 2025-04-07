import Event from "../models/Event.js";

export const createEvent = async (req, res, next) => {
  const event = req.body;
  event.status = "upcoming";
  event.volunteersJoined = 0;

  try {
    const newEvent = new Event(event);
    await newEvent.save();
    res.status(201).json({
      success: true,
      error: false,
      message: "Event created successfully",
      data: { event: newEvent },
    });
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
