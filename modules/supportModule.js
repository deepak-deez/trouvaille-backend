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
  status,
  userDetails,
  joiningYear
) => {
  console.log(userType, name, email, phone, password, status);
  return {
    userType: userType,
    userName: name,
    email: email,
    phone: phone,
    password: await passwordhashed(password),
    isActive: status,
    userDetails: userDetails,
    joiningYear: joiningYear,
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

export const tripPackageObject = (profileimage, trip) => {
  return {
    title: trip.title,
    image: {
      public_id: profileimage.public_id,
      url: profileimage.secure_url,
    },
    duration: trip.duration,
    activities: trip.activities,
    tripCategory: trip.tripCategory,
    placeNumber: trip.placeNumber,
    maximumGuests: trip.maximumGuests,
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
    tripId: book.tripId,
    userId: book.userId,
    title: book.title,
    name: book.name,
    phone: book.phone,
    email: book.email,
    otherPassenger: book.otherPassenger,
    address: book.address,
    image: {
      public_id: image.public_id,
      url: image.secure_url,
    },
    bookingStatus: "pending",
    deleteReason: "",
    cancellationStatus: false,
    link: "",
  };
};

export const userDetails = (image, data) => {
  return {
    image: {
      public_id: image.public_id,
      url: image.url,
    },
    name: data.name,
    place: data.place,
    DOB: data.DOB,
    gender: data.gender,
    maritalStatus: data.maritalStatus,
  };
};

// export const bookingData = (image, book) => {
//   return {
//     title: book.title,
//     name: book.name,
//     phone: book.name,
//     email: book.name,
//     otherPassenger: book.otherPassenger,
//     address: book.address,
//     image: {
//       data: image,
//       contentType: "image/png+jpg+jpeg",
//     },
//     bookingStatus: book.bookingStatus,
//     deleteReason: book.deleteReason,
//   };
// };
