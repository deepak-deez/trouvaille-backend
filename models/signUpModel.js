import mongoose from "mongoose";
// import bcrypt from "bcrypt";

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
    unique: true,
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

// schema.pre("save", async (next) => {
//   console.log("hello from pre", password);
//   //   if (this.isModified("password")) {
//   this.password = bcrypt.hash(this.password, 12);
//   //   }
//   next();
// });

export const UserModel = mongoose.model("User", schema);
