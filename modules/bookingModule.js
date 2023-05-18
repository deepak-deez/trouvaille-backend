import { BookingModel } from "../models/bookingModel.js";
import { Response, bookingData } from "./supportModule.js";
import cloudinary from "./cloudinary.js";

export const createBooking = async (req, res, next) => {
  try {
    const image = await cloudinary.uploader.upload(req.body.image, {
      folder: `${req.params.trip}`,
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
    const result = await BookingModel.find({ userId: req.params.userId });
    getResultResponse(res, result);
  } catch (error) {
    next(error);
  }
};

export const getBookingDetails = async (req, res, next) => {
  try {
    const result = await BookingModel.find({ _id: req.params.id });
    getResultResponse(res, result);
  } catch (error) {
    next(error);
  }
};
