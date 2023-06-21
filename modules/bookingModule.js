import { BookingModel } from "../models/bookingModel.js";
import { TripPackage } from "../models/TripPackageModel.js";
import { Response } from "./supportModule.js";
import { format } from "date-fns";

import jwt from "jsonwebtoken";
import env from "dotenv";
import { getTripDetails } from "./TripPackageModule.js";

env.config();

//creating trip packages

const completetStatusUpdate = (data) => {
  const today = format(new Date(), "dd-MM-yyyy");
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

export const createBooking = async (req, res, next) => {
  try {
    const tripId = req.body.tripId;
    const tripData = await TripPackage.findOne({ _id: tripId });
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

const getResultResponse = (res, result) => {
  if (result === null || result.length !== 0)
    return res
      .status(200)
      .send(Response(result, `All booking details are here...`, true));
  return res
    .status(500)
    .send(Response(null, `Booking details not found!`, false));
};

export const allBooking = async (req, res, next) => {
  try {
    const result = await BookingModel.find({});
    completetStatusUpdate(result);
    getResultResponse(res, result);
  } catch (error) {
    next(error);
  }
};

export const getAllBookingByUser = async (req, res, next) => {
  try {
    const result = await BookingModel.find({ userId: req.params.userId });
    getResultResponse(res, result);
  } catch (error) {
    next(error);
  }
};

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

export const getBookingDetails = async (req, res, next) => {
  try {
    const result = await BookingModel.findOne({ _id: req.params.id });
    getResultResponse(res, result);
  } catch (error) {
    next(error);
  }
};

export const getCancellationRequest = async (req, res, next) => {
  try {
    const result = await BookingModel.find({ cancellationStatus: true });
    getResultResponse(res, result);
  } catch (error) {
    next(error);
  }
};

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

const deleteBooking = async (id, res) => {
  const data = await BookingModel.findOne({ _id: id });
  if (data === null)
    return res.status(200).send(Response(null, "No booking found!", false));

  const result = await BookingModel.findOneAndUpdate(
    { _id: id },
    { deleteStatus: true, bookingStatus: "cancelled" },
    { new: true }
  );
  if (result) {
    return res
      .status(200)
      .send(Response(null, `Booking deleted successfully.`, true));
  }
};

// export const tokenVarification = async (req, res, next) => {
//   try {
//     const { id, token } = req.params;
//     const trip = await BookingModel.findOne({ _id: id });

//     if (trip === null)
//       return res.status(500).send(Response(null,  `Booking not found!`, false));
//     const secret = process.env.JWT_SECRET + trip.phone;
//     await jwt.verify(token, secret, (err, decode) => {
//       if (err) {
//         return res.status(500).send(Response(null,  "Not authenticate!", false));
//       } else {
//         // deleteBooking(trip._id, res);
//         return res.status(200).send(
//           Response({ id: trip._id }, `Booking details verified.`, true)
//         );
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const UserActionOnDelete = async (req, res, next) => {
  try {
    if (req.params.user !== "Admin") {
      const trip = await BookingModel.findOne({ _id: req.params.id });
      if (trip === null)
        return res
          .status(500)
          .send(Response(null, `Booking not found!`, false));
      // const secret = process.env.JWT_SECRET + trip.phone;

      // const payload = {
      //   email: trip.email,
      //   id: trip._id,
      // };
      // const token = jwt.sign(payload, secret, { expiresIn: "7d" });
      // const link = `http://localhost:${process.env.RESET_MAIL_PORT}/token-verification/${trip._id}/${token}`;
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
          // bookingStatus: req.body.bookingStatus,
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
