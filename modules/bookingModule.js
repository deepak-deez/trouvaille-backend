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
  if (result.length !== 0)
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

export const tokenVarification = async (req, res, next) => {
  try {
    const { id, token } = req.params;
    const trip = await BookingModel.findOne({ _id: id });
    if (trip.length === 0)
      return res.send(Response(null, 500, `Trip not found!`, false));
    const secret = process.env.JWT_SECRET + trip.phone;
    await jwt.verify(token, secret, (err, decode) => {
      if (err) {
        return res.send(Response(null, 500, "Not authenticate!", false));
      } else {
        return res.send(
          Response(
            { email: user[0].email },
            200,
            `${req.params.user} verified.`,
            true
          )
        );
      }
    });
    if (trip.length === 0)
      return res.send(Response(null, 500, `Trip not found!`, false));
  } catch (error) {
    next(error);
  }
};

export const deleteBooking = async (req, res, next) => {
  try {
    if (req.params.userType !== "Admin") {
      const trip = await BookingModel.findOne({ _id: req.params.id });
      if (trip.length === 0)
        return res.send(Response(null, 500, `Trip not found!`, false));
      const secret = process.env.JWT_SECRET + trip.phone;
      const payload = {
        email: req.body.email,
        id: trip._id,
      };
      const token = jwt.sign(payload, secret, { expiresIn: "7d" });
      console.log("token : ", token);
    }
  } catch (error) {
    next(error);
  }
};
