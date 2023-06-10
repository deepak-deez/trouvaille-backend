import bcrypt from "bcrypt";
import { UserModel } from "../models/signUpModel.js";
import * as fs from "fs/promises";
import path from "path";

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

export const Response = (data, message, success) => {
  return {
    data: data,
    message: message,
    success: success,
  };
};

export const tripPackageObject = (profileimage, trip) => {
  return {
    title: trip.title,
    image: profileimage,
    duration: trip.duration,
    activities: JSON.parse(trip.activities),
    tripCategory: JSON.parse(trip.tripCategory),
    placeNumber: trip.placeNumber,
    maximumGuests: trip.maximumGuests,
    tripHighlights: JSON.parse(trip.tripHighlights),
    price: trip.price,
    discountedPrice: trip.discountedPrice,
    occasions: JSON.parse(trip.occasions),
    travelType: JSON.parse(trip.travelType),
    amenities: JSON.parse(trip.amenities),
    briefDescription: trip.briefDescription,
    faq: JSON.parse(trip.faq),
    status: trip.status,
  };
};

export const userDetails = (imageUrl, data) => {
  return {
    image: imageUrl,
    name: data.name,
    place: data.place,
    DOB: data.DOB,
    gender: data.gender,
    maritalStatus: data.maritalStatus,
  };
};

export const deleteFile = async (folderName, fileName) => {
  const filePath = path.join("database", "images", folderName, fileName);
  await fs.unlink(filePath, (err) => {
    if (err) console.log("Cann't delete this file!!!");
  });
};
