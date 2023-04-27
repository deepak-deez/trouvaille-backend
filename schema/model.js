import mongoose from "mongoose";
const schema = new mongoose.Schema({
  purpose: {
    type: String,
  },
  image: {
    type: String,
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
});

export const tripDetails = mongoose.model("tripDetails", schema)
