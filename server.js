import db from "./database/connection.js";
import express from "express";
import cors from "cors";
import env from "dotenv";
import tripRoute from "./routes/tripRoutes.js";

env.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(tripRoute);

app.use((req, res, next) => {
  next(new Error("Page not found"));
});

app.use((error, req, res, next) => {
  if (error) {
    console.log("error");
    res.status(404).send({
      data: null,
      message: error.message,
      success: false,
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server created");
});
