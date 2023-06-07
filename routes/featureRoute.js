import express from "express";
import * as utility from "../modules/utilityModule.js";
import * as tripModule from "../modules/tripPackageModule.js";
import {
  featureStorageEngine,
  packageStorageEngine,
} from "../modules/multerStorageEngine.js";
const app = express();

app.post(
  "/create-feature/:feature",
  featureStorageEngine.single("image"),
  utility.createFeature
);
app.get("/get-feature/:feature", utility.showAll);
app.get(
  "/get-feature/:feature1/:feature2/:feature3",
  utility.showTravelAmenityOccasion
);
app.post("/get-filtered-feature/:feature", utility.filterTripList);
app.post(
  "/update-feature/:feature/:id",
  featureStorageEngine.single("image"),
  utility.updateFeature
);
app.delete("/delete-feature/:feature/:id", utility.deleteFeature);

app.post("/create-module/:trip", tripModule.createTripPackage);
app.post("/get-module/:trip", tripModule.getTripPackages);
app.get("/get-module/:trip", tripModule.getTripPackages);
app.get("/get-trip-details/:trip/:id", tripModule.getTripDetails);
app.post("/update-module/:trip/:id", tripModule.updatePackage);
app.delete("/delete-module/:trip/:id", tripModule.deletePackage);
// options api
app.get(
  "/get-options/:feature1/:feature2/:feature3/:feature4",
  utility.getAllFeature
);

export default app;
