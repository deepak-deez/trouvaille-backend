import express from "express";
import * as utility from "../modules/utilityModule.js";
import { tripStorageEngine } from "../modules/multerStorageEngine.js";
import * as tripModule from "../modules/tripPackageModule.js";

const app = express();

// app.post(
//   "/create/:feature",
//   tripStorageEngine.single("featureImages"),
//   utility.createFeature
// );
app.post("/create/:feature", utility.createFeature);
app.get("/get/:feature", utility.showAll);
app.post("/update/:feature/:id", utility.updateFeature);
app.delete("/delete/:feature/:id", utility.deleteFeature);

// app.post(
//   "/create-module/:trip",
//   tripStorageEngine.single("packageImage"),
//   tripModule.createTripPackage
// );
app.post("/create-module/:trip", tripModule.createTripPackage);
app.get("/get-module/:trip", tripModule.getTripPackages);
app.get("/get-trip-details/:trip/:id", tripModule.getTripDetails);
app.post("/update-module/:trip/:id", tripModule.updatePackage);
app.delete("/delete-module/:trip/:id", tripModule.deletePackage);

export default app;
