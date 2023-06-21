import mongoose from "mongoose";

const schema = new mongoose.Schema({
  userType: { type: String, trim: true, require: true },
  title: { type: String, trim: true, require: true },
  description: { type: String, trim: true },
  refId: { type: String, trim: true, require: true },
  userId: { type: String, trim: true },
  readStatus: { type: String, trim: true, require: true },
  createdAt: { type: String, trim: true, require: true },
});

export const Notification = mongoose.model("Notifications", schema);
