import { Schema, model } from "mongoose";

const DonationSchema = new Schema(
  {
    donor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true, min: 0 },
    transactionId: { type: String, required: true, unique: true },
    message: { type: String, trim: true, maxLength: 500 },
    eventTitle: { type: String, trim: true, required: true },
  },
  { timestamps: true }
);

export default model("donation", DonationSchema);
