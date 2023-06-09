import { BookingModel } from "../models/bookingModel.js";
import { tripPackage } from "../models/tripPackageModel.js";
import { Response } from "./supportModule.js";

import jwt from "jsonwebtoken";
import env from "dotenv";
import { getTripDetails } from "./tripPackageModule.js";

env.config();

export const createBooking = async (req, res, next) => {
  try {
    const tripId = req.body.tripId;
    const tripData = await tripPackage.findOne({ _id: tripId });
    const bookingData = req.body;
    bookingData.tripDetails = tripData;
    // console.log(bookingData, "allData");
    const data = await BookingModel(bookingData);
    const result = await data.save();
    if (result?._id)
      return res
        .status(200)
        .send(Response(result, "Booking successfull!", true));
    return res
      .status(500)
      .send(Response(null, "Booking unsuccessfull!", false));
    // const image = `http://localhost:7000/featureImage/${req.file.filename}`;
    // const booking = await BookingModel(bookingData("", req.body));
    // const result = await booking.save();
    // if (result?._id)
    //   res.status(200).send(Response(result, "Booking successfull!", true));
    // else res.status(500).send(Response(null,  "Booking unsuccessfull!", false));
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
    .send(Response(null, `Booking details not found!`, true));
};

export const allBooking = async (req, res, next) => {
  try {
    const result = await BookingModel.find({});
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
    console.log("Params : ", req.params);
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

const deleteBooking = async (id, res) => {
  const data = await BookingModel.findOne({ _id: id });
  if (data === null)
    return res.status(200).send(Response(null, "No booking found!", false));

  const result = await BookingModel.findOneAndUpdate(
    { _id: id },
    { deleteStatus: true, bookingStatus: "canceled" },
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
//     console.log("params :", req.params);
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
    console.log(req.params);
    if (req.params.user !== "Admin") {
      const trip = await BookingModel.findOne({ _id: req.params.id });
      console.log(trip);
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
      // // console.log("link : ", link);
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
      console.log(req.params.id);
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
          bookingStatus: req.body.bookingStatus,
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
