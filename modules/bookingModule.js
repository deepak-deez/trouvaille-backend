import { BookingModel } from "../models/bookingModel.js";
import { TripPackage } from "../models/TripPackageModel.js";
import { Response } from "./supportModule.js";
import { format } from "date-fns";

import jwt from "jsonwebtoken";
import env from "dotenv";
import { getTripDetails } from "./TripPackageModule.js";

env.config();

// Complete booking by comparing the end date and the current date
const completetStatusUpdate = (data) => {
  const today = format(new Date(), "yyyy-MM-dd");
  if (data.length !== 0) {
    data.forEach(async (booking) => {
      if (
        booking.tripDetails.endDate < today &&
        booking.bookingStatus !== "Completed"
      ) {
        await BookingModel.findByIdAndUpdate(
          { _id: booking.id },
          { $set: { bookingStatus: "Completed" } },
          { new: true }
        );
      }
    });
  }
};

const getResultResponse = (res, result) => {
  if (result === null || result.length !== 0)
    return res
      .status(200)
      .send(Response(result, `All booking details are here...`, true));
  return res
    .status(500)
    .send(Response(null, `Booking details not found!`, false));
};

// Create booking
export const createBooking = async (req, res, next) => {
  try {
    const tripId = req.body.tripId;
    const tripData = await TripPackage.findOne({ _id: tripId });
    if (tripData === null)
      return res
        .status(500)
        .send(Response(null, "Trip package not found!", false));

    const bookingData = req.body;
    bookingData.tripDetails = tripData;
    const data = await BookingModel(bookingData);
    const result = await data.save();
    if (result?._id)
      return res
        .status(200)
        .send(Response(result, "Booking successfull!", true));
    return res
      .status(500)
      .send(Response(null, "Booking unsuccessfull!", false));
  } catch (error) {
    next(error);
  }
};

// Get all bookings
export const allBooking = async (req, res, next) => {
  try {
    const result = await BookingModel.find({});
    completetStatusUpdate(result);
    getResultResponse(res, result);
  } catch (error) {
    next(error);
  }
};

// Get all booking by an particular user
export const getAllBookingByUser = async (req, res, next) => {
  try {
    const result = await BookingModel.find({ userId: req.params.userId });
    getResultResponse(res, result);
  } catch (error) {
    next(error);
  }
};

// View a booking by created by a user
export const getBookingByUser = async (req, res, next) => {
  try {
    const result = await BookingModel.find({
      userId: req.params.userId,
      _id: req.params.id,
    });
    getResultResponse(res, result);
  } catch (error) {
    next(error);
  }
};

// View a booking
export const getBookingDetails = async (req, res, next) => {
  try {
    const result = await BookingModel.findOne({ _id: req.params.id });
    getResultResponse(res, result);
  } catch (error) {
    next(error);
  }
};

// Get Booking those are requested for cancellation
export const getCancellationRequest = async (req, res, next) => {
  try {
    const result = await BookingModel.find({ cancellationStatus: true });
    getResultResponse(res, result);
  } catch (error) {
    next(error);
  }
};

// Get booking by its status
export const getBookingByStatus = async (req, res, next) => {
  try {
    const result = await BookingModel.find({
      bookingStatus: req.params.status,
    });
    getResultResponse(res, result);
  } catch (error) {
    next(error);
  }
};

// Soft delete
const deleteBooking = async (id, res) => {
  const data = await BookingModel.findOne({ _id: id });
  if (data === null)
    return res.status(200).send(Response(null, "No booking found!", false));

  const result = await BookingModel.findOneAndUpdate(
    { _id: id },
    {
      deleteStatus: true,
      cancellationStatus: false,
      bookingStatus: "Cancelled",
    },
    { new: true }
  );
  if (result) {
    return res
      .status(200)
      .send(Response(null, `Booking deleted successfully.`, true));
  }
};

// Delete or sending request depending on user type (Admin / Backend user)
export const UserActionOnDelete = async (req, res, next) => {
  try {
    if (req.params.user !== "Admin") {
      const trip = await BookingModel.findOne({ _id: req.params.id });
      if (trip === null)
        return res
          .status(500)
          .send(Response(null, `Booking not found!`, false));
      return res
        .status(200)
        .send(
          Response(
            { bookingDetails: trip },
            "Delete request has been send successfully!",
            true
          )
        );
    } else {
      deleteBooking(req.params.id, res);
    }
  } catch (error) {
    next(error);
  }
};

// Restore booking
export const restoreBooking = async (req, res, next) => {
  try {
    const id = req.params.id;
    const trip = BookingModel.findOne({ _id: id });
    if (trip === null)
      return res.status(500).send(Response(null, `Booking not found!`, false));
    const newDetails = await BookingModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          cancellationStatus: req.body.cancellationStatus,
          deleteReason: req.body.deleteReason,
          read: req.body.read,
        },
      },
      { new: true }
    );
    if (newDetails?._id) {
      return res
        .status(200)
        .send(
          Response({ data: newDetails }, `Booking restore successfully.`, true)
        );
    }
  } catch (error) {
    next(error);
  }
};

// Update booking status
export const updateBookingStatus = async (req, res, next) => {
  try {
    const id = req.params.id;
    const trip = BookingModel.findOne({ _id: id });
    if (trip === null)
      return res.status(500).send(Response(null, `Booking not found!`, false));
    const newDetails = await BookingModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: { bookingStatus: req.body.bookingStatus },
      },
      { new: true }
    );
    if (newDetails?._id) {
      return res
        .status(200)
        .send(Response(null, `Booking status update successfully.`, true));
    }
  } catch (error) {
    next(error);
  }
};
