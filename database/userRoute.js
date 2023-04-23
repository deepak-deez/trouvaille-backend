import { UserModel } from "./userSignup/signUpModel.js";
import { Router } from "express";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import sendMail from "./controller/sendMail.js";

const userRouter = Router();
const app = express();
app.use(cors());

const passwordhashed = async (text) => {
  return await bcrypt.hash(text, 12);
};

userRouter.post("/reset-mail", sendMail);

export default userRouter;
