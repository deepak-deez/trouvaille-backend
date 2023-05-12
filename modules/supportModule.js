import bcrypt from "bcrypt";
import { UserModel } from "../models/signUpModel.js";

export const passwordhashed = async (text) => {
  return await bcrypt.hash(text, 12);
};

export const registerData = async (
  userType,
  name,
  email,
  phone = "",
  password = "",
  status
) => {
  console.log(userType, name, email, phone, password, status);
  return {
    userType: userType,
    userName: name,
    email: email,
    phone: phone,
    password: await passwordhashed(password),
    isActive: status,
  };
};

export const findUser = async (email) => {
  return await UserModel.find({ email: email });
};

export const Response = (data, statusCode, message, success) => {
  return {
    data: data,
    message: message,
    status: statusCode,
    success: success,
  };
};

export const tripPackageObject = (image, trip) => {
  console.log(trip);
  return {
    title: trip.title,
    image: {
      data: image,
      contentType: "image/png+jpg+jpeg",
    },
    duration: trip.duration,
    activities: trip.activities,
    tripCategory: trip.tripCategory,
    placeNumber: trip.placeNumber,
    maximumGuests: trip.maximumGuests,
    highlightTitle: trip.highlightTitle,
    tripHighlights: trip.tripHighlights,
    price: trip.price,
    discountedPrice: trip.discountedPrice,
    occasions: trip.occasions,
    travelType: trip.travelType,
    amenities: trip.amenities,
    briefDescription: trip.briefDescription,
    faq: trip.faq,
    status: trip.status,
  };
};

export const bookingData = (image, book) => {
  return {
    title: book.title,
    name: book.name,
    phone: book.name,
    email: book.name,
    otherPassenger: book.otherPassenger,
    address: book.address,
    image: {
      data: image,
      contentType: "image/png+jpg+jpeg",
    },
    bookingStatus: book.bookingStatus,
    deleteReason: book.deleteReason,
  };
};
