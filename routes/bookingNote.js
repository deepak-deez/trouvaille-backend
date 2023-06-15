import express from "express";
import * as note from "../modules/bookingNoteModule.js";

const app = express();

// Booking note routes
app.post("/add-booking-note", note.addBookingNote);
app.post("/update-booking-note/:id", note.updateBookingNote);
app.get("/get-booking-note", note.getBookingNote);

export default app;
