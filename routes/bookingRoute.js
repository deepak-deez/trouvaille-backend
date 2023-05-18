import express from "express";
import * as book from "../modules/bookingModule.js";

const app = express();

app.post("/trip-booking", book.createBooking);
app.get("/all-booking", book.allBooking);
app.get("/user-all-booking/:userId", book.getAllBookingByUser);
app.get("/booking-details/:id", book.getBookingDetails);

export default app;
