import mongoose from "mongoose";
const schema = new mongoose.Schema({
  purpose: {
    type: String,
  },
  icon: { type: String },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
});

export const featureModel = mongoose.model("tripDetails", schema);
