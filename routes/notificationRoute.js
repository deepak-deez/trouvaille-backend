import express from "express";
import * as popup from "../modules/notificationModule.js";

const app = express();

app.post("/add-notification", popup.addNotification);
app.get("/get-user-notification/:id", popup.getUserNotification);
app.get(
  "/get-booking-notifications/:user",
  popup.getBookingAndCancelNotification
);
app.get("/set-notification-mark-read/:id", popup.setMarkAsRead);
app.get("/set-notification-mark-all-read/:id", popup.setMarkAllAsRead);

export default app;
