import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    userType: { type: String, trim: true, require: true },
    title: { type: String, trim: true, require: true },
    description: { type: String, trim: true },
    refId: { type: String, trim: true, require: true },
    readStatus: { type: String, trim: true, require: true },
  },
  { timestamps: true }
);

export const Notification = mongoose.model("Notifications", schema);
