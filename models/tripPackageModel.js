import mongoose from "mongoose";
const tripPackageSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  duration: {
    type: String,
    required: true,
  },
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
  tripCategory: [
    {
      category: { type: String },
    },
  ],
  placeNumber: {
    type: Number,
    require: true,
  },
  maximumGuests: {
    type: Number,
    require: true,
  },
  highlightTitle: {
    type: String,
    trim: true,
  },
  tripHighlights: [
    {
      name: {
        type: String,
        trim: true,
      },
      description: { type: String },
      icon: {
        data: Buffer,
        contentType: String,
      },
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
  occasions: [
    {
      name: { type: String },
    },
  ],
  travelType: {
    type: String,
    require: true,
  },
  amenities: [
    {
      name: { type: String },
    },
  ],
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
});

export const tripPackage = mongoose.model("tripPackage", tripPackageSchema);
