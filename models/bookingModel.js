import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: { type: String, require: true },
  name: { type: String, require: true },
  phone: { type: String, trim: true, unique: true, require: true },
  email: { type: String, trim: true, unique: true, require: true },
  otherPassenger: [
    {
      firstName: { type: String, trim: true },
      lastName: { type: String, trim: true },
      gender: { type: String, trim: true },
      age: { type: Number, trim: true },
    },
  ],
  address: { type: String, trim: true },
  image: { data: Buffer, contentType: String },
  bookingStatus: { type: String, trim: true },
  deleteReason: { type: String, trim: true },
});

export const BookingModel = mongoose.model("Booking", schema);
