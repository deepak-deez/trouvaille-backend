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

userRouter.get("/all-users", async (req, res, next) => {
  const userData = await UserModel.find({});
  try {
    res.status(200).send({
      data: userData,
      message: "Success",
      success: true,
    });
  } catch (error) {
    next(error);
  }
});

userRouter.post("/user-login", async (req, res, next) => {
  try {
    const userData = await UserModel.find({ email: req.body.email });
    if (bcrypt.compare(userData[0].password, req.body.password)) {
      console.log("User data : ", userData);
      res.status(200).send({
        data: userData,
        message: "Success",
        success: true,
      });
    } else {
      res.status(500).send(new Error("Incorrect password!"));
    }
  } catch {
    res.status(500).send({
      message: "User not exist!",
      success: "false",
    });
  }
  // console.log(userData);
  // console.log(userData[0].password);
  // console.log(await passwordhashed(req.params.password));

  //   console.log(req.params.email, req.params.password);
  // console.log(
  //   "Compare : ",
  //  bcrypt.compare(userData[0].password, req.params.password)
  // );
});

userRouter.post("/user-signUp", async (req, res, next) => {
  try {
    // const { email, phone, password } = req.body;
    // const userData = await UserModel.save({ email, phone, password });

    console.log("password:1:", await passwordhashed(req.body.password));
    console.log(await passwordhashed(req.body.password));
    const userData = await UserModel({
      email: req.body.email,
      phone: req.body.phone,
      password: await passwordhashed(req.body.password),
    });
    // console.log(userData);
    const response = await userData.save();
    if (response) {
      res.status(200).send({
        data: response,
        message: "Account created!",
        success: true,
      });
    } else {
      res.status(500).send(new Error("Failed to create account"));
    }
  } catch (error) {
    next(error);
  }
});

export default userRouter;
