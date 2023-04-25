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

export const tripCategory = mongoose.model("category", schema);
export const amenity = mongoose.model("amenity", schema);
export const occasion = mongoose.model("occasion", schema);
export const travelType = mongoose.model("travelType", schema);
