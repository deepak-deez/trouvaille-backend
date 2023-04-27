import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
    type: Number,
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
});

// schema.pre("save", async (next) => {
//   console.log("hello from pre", password);
//   //   if (this.isModified("password")) {
//   this.password = bcrypt.hash(this.password, 12);
//   //   }
//   next();
// });

export const UserModel = mongoose.model("User", schema);
