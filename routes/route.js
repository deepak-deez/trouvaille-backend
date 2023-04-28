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
  deleteTrip,
} from "./tripCategory.js";

import {
  createTripPackage,
  getTripPackage,
  updatePackage,
  deletePackage,
} from "./tripModule/package.js";

import express, { request } from "express";
import cors from "cors";
import { amenityIcon } from "./amenity.js";
import { occasionIcon } from "./occasion.js";
import { travelTypeIcon } from "./travelType.js";
import { categoryIcon } from "./tripCategory.js";
import { image } from "./tripModule/package.js";

export const app = express();
app.use(express.json());
app.use(cors());

app.post("/createTripData", categoryIcon.single("testImage"), createTripData);
app.post("/createAmenity", amenityIcon.single("testImage"), createAmenity);
app.post("/createOccasion", occasionIcon.single("testImage"), createOccasion);
app.post(
  "/createTravelType",
  travelTypeIcon.single("testImage"),
  createTravelType
);
app.post("/createTripPackage", image.single("testImage"), createTripPackage);
app.get("/getTripData", getTripData);
app.get("/getAmenity", getAmenity);
app.get("/getOccasion", getOccasion);
app.get("/getTravelType", getTravelType);
app.get("/getTripPackage", getTripPackage);
app.put("/modifyTripData/:id", modifyTripData);
app.put("/modifyAmenity/:id", modifyAmenity);
app.put("/modifyOccasion/:id", modifyOccasion);
app.put("/modifyTravelType/:id", modifyTravelType);
app.put("/modifyPackage/:id", updatePackage);
app.delete("/deleteTrip/:id", deleteTrip);
app.delete("/deleteAmenity/:id", deleteAmenity);
app.delete("/deleteOccasion/:id", deleteOccasion);
app.delete("/deleteTravelType/:id", deleteTravelType);
app.delete("/deletePackage/:id", deletePackage);
