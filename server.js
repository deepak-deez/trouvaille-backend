import express from "express";
import db from "./database/connection.js";
import * as userRouter from "./database/userRoute.js";
import cors from "cors";
import env from "dotenv";

env.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(userRouter.app);

app.use((req, res, next) => {
  next(new Error("Page not found"));
});

app.use((error, req, res, next) => {
  if (error) {
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
