import { UserModel } from "../models/signUpModel.js";
import bcrypt from "bcrypt";
import sendMail from "../controller/sendMail.js";
import jwt from "jsonwebtoken";
import { request } from "express";
import env from "dotenv";
import {
  Response,
  registerData,
  findUser,
  passwordhashed,
} from "../modules/supportModule.js";

env.config();
const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneNoFormat = /^\d{10}$/;

export const addNewUser = async (req, res, next) => {
  try {
    if (!req.body.email.match(emailFormat)) {
      return res
        .status(530)
        .send(Response(null, "Invalid email address!", false));
    }
    const existingUser = await findUser(req.body.email);

    if (existingUser.length !== 0) {
      return res
        .status(500)
        .send(Response(null, "User already registered!", false));
    }

    const newUser = new UserModel(
      await registerData(
        req.params.user,
        req.body.name,
        req.body.email,
        "",
        "",
        false
      )
    );
    const backendUser = await newUser.save();
    console.log(backendUser);
    if (backendUser) {
      console.log(req.body.password);
      const secret = process.env.JWT_SECRET;
      const payload = {
        email: req.body.email,
        id: backendUser._id,
      };

      const token = jwt.sign(payload, secret, { expiresIn: "15m" });
      const link = `http://localhost:${process.env.RESET_MAIL_PORT}/token-validation/${req.params.user}/${backendUser._id}/${token}`;
      console.log(link);

      if (await sendMail(req.body.email, link))
        return res
          .status(500)
          .send(Response(null, "Failed to send mail!", false));
      else
        return res
          .status(200)
          .send(Response(null, `Email send to ${req.body.email}`, true));
    } else {
      next(new Error("Failed to add user!"));
    }
  } catch (error) {
    next(error);
  }
};

export const updateDetails = async (req, res, next) => {
  try {
    if (!req.body.email.match(emailFormat)) {
      return res
        .status(530)
        .send(Response(null, "Invalid email address!", false));
    }
    if (!req.body.phone.match(phoneNoFormat))
      return res
        .status(500)
        .send(Response(null, "Not a valid phone number!", false));

    const admin = await UserModel.find({ _id: req.body.id });

    const result = await UserModel.findOneAndUpdate(
      {
        _id: admin[0]._id,
      },
      {
        $set: {
          userName: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          //   address: req.body.address,
        },
      },
      { new: true }
    );
    const payload = { adminDetails: result };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    if (result) {
      return res.status(200).send(
        Response(
          { adminDetails: result, token: token },

          `${req.params.user} details updated successfully.`,
          true
        )
      );
    }
    return res
      .status(500)
      .send(Response(null, "Failed to update details!", false));
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const admin = await findUser(req.body.email);
    // console.log(admin);
    // console.log(req.body.oldPassword, admin[0].password);
    // const isMatched = await bcrypt.compare(
    //   req.body.oldPassword,
    //   admin[0].password
    // );

    // console.log(isMatched);
    // if (isMatched) {
    const result = await UserModel.findOneAndUpdate(
      {
        _id: admin[0]._id,
      },
      {
        $set: {
          password: await passwordhashed(req.body.newPassword),
        },
      },
      { new: true }
    );
    if (result) {
      return res
        .status(200)
        .send(Response(Response(result, "Password reset succesfully.", true)));
    }
    // } else {
    //   return res.status(500).send(Response(null,  "Password doesn't match!", false));
    // }
  } catch (error) {
    next(error);
  }
};

// export const validatePassword = async (req, res, next) => {
//   try {
//     const admin = await findUser(req.body.email);
//     const isMatched = await bcrypt.compare(
//       req.body.password,
//       admin[0].password
//     );
//     if (isMatched) {
//       return res.status(200).send(Response(null,  "Valid admin.", true));
//     }
//   } catch (error) {
//     next(error);
//   }
// };

export const deleteUser = async (req, res, next) => {
  try {
    const { user, id } = req.params;
    const admin = await UserModel.findOne({ _id: id });
    if (admin === null)
      return res
        .status(500)
        .send(Response(null, `${req.params.user} not found!`));
    if (admin.userType === "Admin") {
      return res
        .status(500)
        .send(Response(null, "Cannot delete an admin.", false));
    }
    const result = await UserModel.findOneAndDelete({
      _id: id,
    });
    if (result) {
      return res
        .status(200)
        .send(Response(null, `${user} deleted successfully.`, true));
    }
  } catch (error) {
    next(error);
  }
};
