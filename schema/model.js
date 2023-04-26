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
  },
  description: {
    type: String,
  },
});

export const tripDetails = mongoose.model("tripDetails", schema)
