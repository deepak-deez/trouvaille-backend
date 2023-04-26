import bcrypt from "bcrypt";
import { UserModel } from "../models/signUpModel.js";

export const Response = (data, statusCode, message, success) => {
  return {
    data: data,
    message: message,
    status: statusCode,
    success: success,
  };
};

export const registerData = async (
  userType,
  email,
  phone,
  password,
  status
) => {
  return {
    userType: userType,
    email: email,
    phone: phone,
    password: await passwordhashed(password),
    isActive: status,
  };
};

export const findUser = async (email) => {
  return await UserModel.find({ email: email });
};

export const passwordhashed = async (text) => {
  return await bcrypt.hash(text, 12);
};
