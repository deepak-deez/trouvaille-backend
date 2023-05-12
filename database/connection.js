import mongoose from "mongoose";
import env from "dotenv";

env.config();

mongoose.connect(process.env.TripDatabase, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});
db.on("connected", () => {
  console.log("Database connected...");
});

export default db;
