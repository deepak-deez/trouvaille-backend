import express from "express";
import * as utility from "../modules/utilityModule.js";
import * as tripModule from "../modules/tripPackageModule.js";

const app = express();

// app.post(
//   "/create/:feature",
//   tripStorageEngine.single("featureImages"),
//   utility.createFeature
// );
app.post("/create-feature/:feature", utility.createFeature);
app.get("/get-feature/:feature", utility.showAll);
app.get(
  "/get-feature/:feature1/:feature2/:feature3",
  utility.showTravelAmenityOccasion
);
app.post("/get-filtered-feature/:feature", utility.filterTripList);
app.post("/update-feature/:feature/:id", utility.updateFeature);
app.delete("/delete-feature/:feature/:id", utility.deleteFeature);

// app.post(
//   "/create-module/:trip",
//   tripStorageEngine.single("packageImage"),
//   tripModule.createTripPackage
// );
app.post("/create-module/:trip", tripModule.createTripPackage);
app.post("/get-module/:trip", tripModule.getTripPackages);
app.get("/get-module/:trip", tripModule.getTripPackages);
app.get("/get-trip-details/:trip/:id", tripModule.getTripDetails);
app.post("/update-module/:trip/:id", tripModule.updatePackage);
app.delete("/delete-module/:trip/:id", tripModule.deletePackage);

export default app;
