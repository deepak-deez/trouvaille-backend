import { BookingModel } from "../models/bookingModel.js";
import { Response, bookingData } from "./supportModule.js";
import cloudinary from "./cloudinary.js";
import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

export const createBooking = async (req, res, next) => {
  try {
    const image = await cloudinary.uploader.upload(req.body.image, {
      folder: "Booking",
    });
    const booking = await BookingModel(bookingData(image, req.body));
    const result = await booking.save();
    if (result?._id)
      res.send(Response(result, 200, "Booking successfull!", true));
    else res.send(Response(null, 500, "Booking unsuccessfull!", false));
  } catch (error) {
    next(error);
  }
};

const getResultResponse = (res, result) => {
  if (result === null || result.length !== 0)
    return res.send(
      Response(result, 200, `All booking details are here...`, true)
    );
  return res.send(Response(null, 500, `Booking details not found!`, true));
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
    const result = await BookingModel.findOne({ userId: req.params.userId });
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
    const result = await BookingModel.findOne({ cancellationStatus: true });
    getResultResponse(res, result);
  } catch (error) {
    next(error);
  }
};

const deleteBooking = async (id, res) => {
  console.log(id);
  const data = await BookingModel.findOne({ _id: id });
  console.log(data);
  if (data === null)
    return res.send(Response(null, 200, "No booking found!", false));
  const imgId = data.image.public_id;
  if (imgId) {
    await cloudinary.uploader.destroy(imgId);
  }
  const result = await BookingModel.findOneAndDelete({ _id: id });
  if (result) {
    return res.send(Response(null, 200, `Booking deleted successfully.`, true));
  }
};

export const tokenVarification = async (req, res, next) => {
  try {
    console.log("params :", req.params);
    const { id, token } = req.params;
    const trip = await BookingModel.findOne({ _id: id });

    if (trip === null)
      return res.send(Response(null, 500, `Booking not found!`, false));
    const secret = process.env.JWT_SECRET + trip.phone;
    await jwt.verify(token, secret, (err, decode) => {
      if (err) {
        return res.send(Response(null, 500, "Not authenticate!", false));
      } else {
        // deleteBooking(trip._id, res);
        return res.send(
          Response({ id: trip._id }, 200, `Booking details verified.`, true)
        );
      }
    });
  } catch (error) {
    next(error);
  }
};

export const UserActionOnDelete = async (req, res, next) => {
  try {
    console.log(req.params);
    if (req.params.user !== "Admin") {
      const trip = await BookingModel.findOne({ _id: req.params.id });
      console.log(trip);
      if (trip === null)
        return res.send(Response(null, 500, `Booking not found!`, false));
      const secret = process.env.JWT_SECRET + trip.phone;

      const payload = {
        email: req.body.email,
        id: trip._id,
      };
      const token = jwt.sign(payload, secret, { expiresIn: "7d" });
      const link = `http://localhost:${process.env.ResetMailPort}/token-verification/${trip._id}/${token}`;
      // console.log("link : ", link);
      return res.send(
        Response(
          { link: link, token: token, details: trip },
          200,
          "Delete request has been send successfully!"
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
      return res.send(Response(null, 500, `Booking not found!`, false));
    const newDetails = await BookingModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          cancellationStatus: req.body.cancellationStatus,
          deleteReason: req.body.deleteReason,
        },
      },
      { new: true }
    );
    if (newDetails?._id) {
      return res.send(
        Response(
          { data: newDetails },
          200,
          `Booking restore successfully.`,
          true
        )
      );
    }
  } catch (error) {
    next(error);
  }
};
