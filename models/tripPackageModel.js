import mongoose from "mongoose";
export const tripPackageSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  image: { type: String },
  duration: {
    type: String,
    required: true,
  },
  startDate: { type: String, trim: true },
  endDate: { type: String, trim: true },
  activities: [
    {
      date: {
        type: String,
      },
      details: {
        type: String,
      },
    },
  ],
  tripCategory: [{ type: String }],
  placeNumber: {
    type: Number,
    require: true,
  },
  maximumGuests: {
    type: Number,
    require: true,
  },
  tripHighlights: [
    {
      title: {
        type: String,
        trim: true,
      },
      name: {
        type: String,
        trim: true,
      },
      description: { type: String },
      icon: { type: String },
    },
  ],

  price: {
    type: Number,
    require: true,
  },
  discountedPrice: {
    type: Number,
    require: true,
  },
  occasions: [{ type: String }],
  travelType: {
    type: String,
    require: true,
  },
  amenities: [{ type: String }],
  briefDescription: {
    type: String,
  },
  faq: [
    {
      question: {
        type: String,
      },
      answer: {
        type: String,
      },
    },
  ],
  status: {
    type: String,
    require: true,
  },
  features: [],
});

export const tripPackage = mongoose.model("tripPackage", tripPackageSchema);
