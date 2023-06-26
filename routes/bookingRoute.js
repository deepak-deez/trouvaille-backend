import express from "express";
import * as book from "../modules/bookingModule.js";

const app = express();

app.post("/trip-booking", book.createBooking);
app.get("/all-booking", book.allBooking);
app.get("/user-all-booking/:userId", book.getAllBookingByUser);
app.get("/booking-details/:id", book.getBookingDetails);
app.get("/user-booking/:userId/:id", book.getBookingByUser);
app.get("/get-cancel-booking-request", book.getCancellationRequest);
app.delete("/delete-booking/:user/:id", book.UserActionOnDelete);
app.post("/update-booking/:id", book.restoreBooking);
app.get("/get-booking/:status", book.getBookingByStatus);
app.post("/update-booking-status/:id", book.updateBookingStatus);

export default app;
