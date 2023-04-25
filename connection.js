import mongoose from "mongoose";
import { username, password, clustername } from "./config.js";
// import env from "dotenv";
// env.config();

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
  // const db = mongoose.connection;
  // db.on("error", () => {
  //   console.log("connectionError");
  // });
  // db.once("open", () => {
  //   console.log("Connected successfully");
  // });
};

