import mongoose from "mongoose";
const tripPackageSchema = new mongoose.Schema({
  purpose: {
    type: String,
  },
  title: {
    type: String,
  },
  image: {
    type: String,
  },
  duration: {
    type: String,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  category: {
    type: String,
  },
  placeNumber: {
    type: Number,
  },
  maximumGuests: {
    type: Number,
  },
  tripHighlights: {
    title: {
      type: String,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    icon: {
      type: String,
    },
  },
  price: {
    type: Number,
  },
  discountedPrice: {
    type: Number,
  },
  occasions: {
    type: String,
  },
  travelType: {
    type: String,
  },
  amenities: {
    type: String,
  },
  briefDescription: {
    type: String,
  },
  faq: {
    question: {
      type: String,
    },
    answer: {
      type: String,
    },
  },
  status: {
    type: String,
  },
});

export const tripPackage = mongoose.model("tripPackage", tripPackageSchema);
