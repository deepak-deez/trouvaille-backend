import db from "./database/connection.js";
import express from "express";
import cors from "cors";
import env from "dotenv";
import tripRoute from "./routes/featureRoute.js";
import * as userRouter from "./routes/userRoute.js";
import * as adminRouter from "./routes/backendUserRoute.js";
import bookingRouter from "./routes/bookingRoute.js";
import bookingNote from "./routes/bookingNote.js";

env.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(tripRoute);
app.use(userRouter.app);
app.use(adminRouter.app);
app.use(bookingRouter);
app.use(bookingNote);
app.use("/featureImage", express.static("database/images/features"));
app.use("/packageImage", express.static("database/images/packages"));
app.use("/profileImage", express.static("database/images/profileImages"));

app.use((req, res, next) => {
  next(new Error("Page not found"));
});

app.use((error, req, res, next) => {
  if (error) {
    console.log("error", error);
    res.status(404).send({
      data: null,
      message: error.message(),
      success: false,
    });
  }
});
console.log(process.env.PORT);
app.listen(process.env.PORT, () => {
  console.log("Server created");
});
