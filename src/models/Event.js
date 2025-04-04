import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    organizer: { type: String, required: true },
    volunteersNeeded: { type: Number, required: true },
    volunteersJoined: { type: Number },
    status: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);
export default mongoose.model("Event", EventSchema);
