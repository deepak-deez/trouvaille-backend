import mongoose from "mongoose";

const schema = new mongoose.Schema({
  tripId: { type: String, require: true },
  userId: { type: String, require: true },
  title: { type: String, require: true },
  name: { type: String, require: true },
  phone: { type: String, trim: true, require: true },
  email: { type: String, trim: true, require: true },
  otherPassenger: [
    {
      firstName: { type: String, trim: true },
      lastName: { type: String, trim: true },
      gender: { type: String, trim: true },
      age: { type: Number, trim: true },
    },
  ],
  address: { type: String, trim: true },
  image: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  bookingStatus: { type: String, trim: true },
  deleteReason: { type: String, trim: true },
  cancellationStatus: { type: String, trim: true },
  link: { type: String },
  read: { type: String },
});

export const BookingModel = mongoose.model("Booking", schema);
