import * as mongoose from "mongoose";
import { username, password, clustername } from "./config.js";
import * as dotenv from "dotenv";
dotenv.config();

export const dataConnection = () => {
  mongoose
    .connect(
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
      console.log("error");
    });
};
