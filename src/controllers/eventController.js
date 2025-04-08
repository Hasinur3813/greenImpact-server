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

export const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params; // Extract the event ID from the request parameters
    const event = req.body; // Extract the updated event data from the request body
    console.log(event);

    // Find the event by ID and update it with the new data
    const updatedEvent = await Event.findByIdAndUpdate(id, event, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    });

    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      error: false,
      message: "Event updated successfully",
      data: { event: updatedEvent },
    });
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the event by ID and delete it
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      error: false,
      message: "Event deleted successfully",
      data: { event: deletedEvent },
    });
  } catch (error) {
    next(error);
  }
};
