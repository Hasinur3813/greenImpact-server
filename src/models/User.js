import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    full_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["volunteer", "donor", "admin"],
      default: "donor",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
