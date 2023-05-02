import express from "express";
import * as utility from "../modules/utilityModule.js";
import { tripStorageEngine } from "../modules/multerStorageEngine.js";

const app = express();

app.post(
  "/create/:feature",
  tripStorageEngine.single("featureImages"),
  utility.createFeature
);
app.get("/get/:feature", utility.showAll);
app.post("/update/:feature/:id", utility.updateFeature);
app.delete("/delete/:feature/:id", utility.deleteFeature);

export default app;
