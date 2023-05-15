import mongoose from "mongoose";
const tripPackageSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
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
      icon: {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
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
});

export const tripPackage = mongoose.model("tripPackage", tripPackageSchema);
