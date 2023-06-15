import mongoose from "mongoose";

const schema = new mongoose.Schema({
  note: { type: String, trim: true, require: true },
  addDate: { type: String },
});

export const BookingNote = mongoose.model("BookingNote", schema);
