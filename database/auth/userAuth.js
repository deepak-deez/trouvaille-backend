import { UserModel } from "../models/signUpModel.js";
import bcrypt from "bcrypt";
import sendMail from "../controller/sendMail.js";
import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

// mail and phone number formate
const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneNoFormat = /^\d{10}$/;

const Response = (data, statusCode, message, success) => {
  return {
    data: data,
    message: message,
    status: statusCode,
    success: success,
  };
};
const registerData = async (userType, email, phone, password, status) => {
  return {
    userType: userType,
    email: email,
    phone: phone,
    password: await passwordhashed(password),
    isActive: status,
  };
};

const findUser = async (email) => {
  return await UserModel.find({ email: email });
};

const passwordhashed = async (text) => {
  return await bcrypt.hash(text, 12);
};

// const emailValidation = (email) => {
//     if (!email.match(emailFormat))
//       return Response(null, 500, "Not a valid email!", false);
//   };

// const phoneNoValidation = (phone) => {
// if (!phone.match(phoneNoFormat))
//     return Response(null, 500, "Not a valid phone number!", false);
// };

export const userRegister = async (req, res, next) => {
  try {
    if (!req.body.email.match(emailFormat))
      return res.send(Response(null, 500, "Not a valid email!", false));

    if ((await UserModel.findOne({ email: req.body.email })) !== null)
      return res.send(Response(null, 500, "Email already exist!", false));

    if (req.body.phone !== undefined) {
      if (!req.body.phone.match(phoneNoFormat))
        return res.send(
          Response(null, 500, "Not a valid phone number!", false)
        );

      if ((await UserModel.findOne({ phone: req.body.phone })) !== null)
        return res.send(
          Response(null, 500, "Phone number already exist!", false)
        );
    }

    const newUser = await UserModel(
      await registerData(
        "Frontend-user",
        req.body.email,
        req.body.phone,
        req.body.password,
        false
      )
    );
    const result = await newUser.save();
    if (result?._id)
      res.send(Response(newUser, 200, "Account create successfully!", true));
    else res.send(Response(null, 500, "Failed to create account!", false));
  } catch (err) {
    next(err);
  }
};

export const FrontendUserLogin = async (req, res, next) => {
  try {
    if (!req.body.email.match(emailFormat))
      return res.send(Response(null, 500, "Not a valid email!", false));

    const user = await findUser(req.body.email);

    if (user === null)
      return res.send(
        Response(null, 500, `${req.params.user} not found!`, false)
      );

    if (req.params.user !== user[0].userType)
      return res.send(Response(null, 500, `Not an ${req.params.user}!`, false));
    else {
      const isMatched = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (isMatched) {
        const result = await UserModel.findOneAndUpdate(
          {
            _id: user[0]._id,
          },
          {
            $set: {
              isActive: true,
            },
          },
          { new: true }
        );
        console.log(result, "result");
        return res.send(Response(result, 200, "Login Sucessfull!", true));
      } else {
        return res.send(Response(null, 500, "Wrong password!", false));
      }
    }
  } catch (err) {
    next(err);
  }
};

export const FrontendUserLogout = async (req, res, next) => {
  try {
    const user = await findUser(req.body.email);
    const result = await UserModel.findOneAndUpdate(
      {
        _id: user[0]._id,
      },
      {
        $set: {
          isActive: false,
        },
      },
      { new: true }
    );
    if (result)
      return res.send(Response(null, 200, "Logged out successfully!", true));
    else return res.send(Response(null, 500, "Failed to logout!", false));
  } catch (err) {
    next(err);
  }
};

export const FrontendUserData = async (req, res, next) => {
  console.log(req.params.user);
  try {
    const user = await UserModel.find({ userType: req.params.user });
    return res.send(
      Response(user, 200, `All ${req.params.user}s are here...`, true)
    );
  } catch (err) {
    next(err);
  }
};

export const sendResetMail = async (req, res, next) => {
  try {
    if (!req.body.email.match(emailFormat))
      return res.send(Response(null, 500, "Not a valid email!", false));

    const user = await findUser(req.body.email);
    if (user === null)
      return res.send(
        Response(null, 500, `${req.params.user} not found!`, false)
      );

    if (req.params.user !== user[0].userType)
      return res.send(Response(null, 500, `Not an ${req.params.user}!`, false));

    const secret = process.env.JWT_SECRET + user[0].password;
    const payload = {
      email: req.body.email,
      id: user[0]._id,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "15m" });
    console.log("token : ", token);
    const link = `http://localhost:7080/reset-password/${req.params.user}/${user[0]._id}/${token}`;
    console.log("Link : ", link);
    if (await sendMail(req.body.email, link))
      return res.send(Response(null, 500, "Failed to send mail!", false));
    else
      return res.send(
        Response(null, 200, `Email send to ${req.body.email}`, true)
      );
  } catch (err) {
    next(err);
  }
};

export const resetPasswordValidation = async (req, res, next) => {
  const { id, token } = req.params;
  try {
    const user = await UserModel.find({ _id: id });
    if (user === null)
      return res.send(
        Response(null, 500, `${req.params.user} not found!`, false)
      );

    if (req.params.user !== user[0].userType)
      return res.send(Response(null, 500, `Not an ${req.params.user}!`, false));

    const secret = process.env.JWT_SECRET + user.password;
    try {
      await jwt.verify(token, secret, (err, decode) => {
        console.log("Decode: ", decode);
      });
      return res.send(
        Response(
          { email: user[0].email },
          200,
          `${req.params.user} varified for the reset password`,
          true
        )
      );
    } catch (err) {
      return res.send(null, 500, "Not authenticate to reset password!", false);
    }
  } catch (err) {
    next(err);
  }
};

export const setPassword = async (req, res, next) => {
  try {
    if (!req.body.email.match(emailFormat))
      return res.send(Response(null, 500, "Not a valid email!", false));

    const user = await findUser(req.body.email);
    if (user === null) res.send(Response(null, 500, "User not found", false));

    const secret = process.env.JWT_SECRET + user[0].password;
    try {
      const payload = jwt.verify(req.body.token, secret);
      console.log(payload);
      const result = await UserModel.findOneAndUpdate(
        { _id: payload.id },
        { $set: { password: await bcrypt.hash(req.body.newPassword, 12) } }
      );
      if (result)
        return res.send(Response(null, 200, "Password reset successfully"));
      else
        return res.send(Response(null, 500, "Reset password failed!", false));
    } catch (err) {
      return res.send(Response(null, 500, "Token validation failed!", false));
    }
  } catch (err) {
    next(err);
  }
};
