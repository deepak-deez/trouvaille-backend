import { BookingNote } from "../models/bookingNoteModel.js";
import { Response } from "./supportModule.js";

export const addBookingNote = async (req, res, next) => {
  try {
    const data = await BookingNote({ note: req.body.note });
    data.save();

    if (data?._id) {
      await BookingNote.find({});
      return res
        .status(200)
        .send(Response(data, "Booking note added successfull!", true));
    }
    return res
      .status(500)
      .send(Response(null, "Failed to create booking note!", false));
  } catch (error) {
    next(error);
  }
};

export const getBookingNote = async (req, res, next) => {
  try {
    const result = await BookingNote.find({});
    if (result) {
      return res
        .status(200)
        .send(Response(result, `Successfully find Booking note`, true));
    }
    return res
      .status(500)
      .send(Response(null, `Booking note not found!`, false));
  } catch (error) {
    next(error);
  }
};

export const updateBookingNote = async (req, res, next) => {
  try {
    const result = await BookingNote.findOne({ _id: req.params.id });
    if (result === null)
      return res
        .status(500)
        .send(Response(null, `Booking note not found!`, false));
    const newNote = await BookingNote.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: { note: req.body.note },
      },
      { new: true }
    );
    if (newNote?._id) {
      return res
        .status(200)
        .send(Response(newNote, `Booking note update successfully.`, true));
    }
  } catch (error) {
    next(error);
  }
};

export const deleteBookingNote = async (req, res, next) => {
  try {
    const note = await BookingNote.findOne({ _id: req.params.id });
    if (note === null)
      return res
        .status(500)
        .send(Response(null, `Booking note not found!`, false));
    const result = await BookingNote.findOneAndDelete({ _id: req.params.id });
    if (result) {
      return res
        .status(200)
        .send(Response(null, `Booking note deleted successfully.`, true));
    }
  } catch (error) {
    next(error);
  }
};
