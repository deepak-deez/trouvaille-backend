import mongoose from "mongoose";
import { username, password, clustername } from "../config.js";

export const dataConnection = () => {
  mongoose.connect(
    `mongodb+srv://${username}:${password}@${clustername}.mongodb.net/test`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected...");
  })
  .catch(() => {
    console.log("error...");
  })
};

