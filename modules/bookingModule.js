import { BookingModel } from "../models/bookingModel";
import { Response } from "./supportModule";

export const createBooking = async (req, res, next) => {
  try {
    const bufferImage = Buffer.from(req.body.image.slice(22), "base64");
    const booking = await BookingModel(bookingData(bufferImage, req.body));
    const result = await booking.save();
    if (result?._id)
      res.send(Response(result, 200, "Booking successfull!", true));
    else res.send(Response(null, 500, "Booking unsuccessfull!", false));
  } catch (error) {
    next(error);
  }
};
