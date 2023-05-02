import express from "express";
import * as utility from "../modules/utilityModule.js";
import { tripStorageEngine } from "../modules/multerStorageEngine.js";

const app = express();

app.post(
  "/create/:feature",
  tripStorageEngine.single("featureImages"),
  utility.createAmenity
);
app.get("/get/:feature", utility.getAmenity);

export default app;
