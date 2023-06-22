import express from "express";
import * as popup from "../modules/notificationModule.js";

const app = express();

app.post("/add-notification", popup.addNotification);
// app.get("/get-all-notification", popup.allNotification);
// app.get("/get-notification/:id", popup.getNotificationById);
app.get("/get-user-notification/:id", popup.getUserNotification);
app.get("/get-booking-notifications/:user", popup.getBookingNotification);
app.get("/set-notification-mark-read/:id", popup.setMarkAsRead);

export default app;
