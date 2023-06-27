import mongoose from "mongoose";

const schema = new mongoose.Schema({
  userType: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    require: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    require: true,
  },
  isActive: {
    type: Boolean,
    require: true,
  },
  userDetails: {
    image: { type: String },
    name: { type: String, trim: true },
    place: { type: String, trim: true },
    DOB: { type: String, trim: true },
    gender: { type: String, trim: true },
    maritalStatus: { type: String, trim: true },
  },
  joiningYear: { type: Number, trim: true, require: true },
});

export const UserModel = mongoose.model("User", schema);
