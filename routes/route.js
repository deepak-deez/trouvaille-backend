import {
  createOccasion,
  getOccasion,
  modifyOccasion,
  deleteOccasion,
} from "./occasion.js";

import {
  createTravelType,
  getTravelType,
  modifyTravelType,
  deleteTravelType,
} from "./travelType.js";

import {
  createAmenity,
  getAmenity,
  modifyAmenity,
  deleteAmenity,
} from "./amenity.js";

import {
  createTripData,
  getTripData,
  modifyTripData,
  deleteTrip
} from "./tripCategory.js";

import {
  createTripPackage,
  getTripPackage,
  updatePackage,
  deletePackage,
} from "./tripModule/package.js";

import express, { request } from "express";
import cors from "cors";

export const app = express();
app.use(express.json());
app.use(cors());

app.post("/createTripData", createTripData);
app.post("/createAmenity", createAmenity);
app.post("/createOccasion", createOccasion);
app.post("/createTravelType", createTravelType);
app.post("/createTripPackage", createTripPackage)
app.get("/getTripData", getTripData);
app.get("/getAmenity", getAmenity);
app.get("/getOccasion", getOccasion);
app.get("/getTravelType", getTravelType);
app.get("/getTripPackage", getTripPackage)
app.put("/modifyTripData/:id", modifyTripData);
app.put("/modifyAmenity/:id", modifyAmenity);
app.put("/modifyOccasion/:id", modifyOccasion);
app.put("/modifyTravelType/:id", modifyTravelType);
app.put("/modifyPackage/:id", updatePackage)
app.delete("/deleteTrip/:id", deleteTrip);
app.delete("/deleteAmenity/:id", deleteAmenity);
app.delete("/deleteOccasion/:id", deleteOccasion);
app.delete("/deleteTravelType/:id", deleteTravelType);
app.delete("/deletePackage/:id", deletePackage)
