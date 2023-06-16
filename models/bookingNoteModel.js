import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    note: { type: String, trim: true, require: true },
  },
  { timestamps: true }
);

export const BookingNote = mongoose.model("BookingNote", schema);
