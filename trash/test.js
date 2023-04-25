import { UserModel } from "../models/signUpModel.js";
import bcrypt from "bcrypt";
import sendMail from "../controller/sendMail.js";
import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

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

//Admin Registration
export const adminRegister = async (req, res, next) => {
  try {
    if (!req.body.email.match(emailFormat))
      return res.send(Response(null, 500, "Not a valid email!", false));

    if ((await UserModel.findOne({ email: req.body.email })) !== null)
      return res.send(Response(null, 500, "Email already exist!", false));

    const newUser = await UserModel(
      await registerData(
        "Admin",
        req.body.email,
        req.body.phone,
        req.body.password,
        false
      )
    );
    const result = await newUser.save();
    if (result?._id)
      res.send(Response(newUser, 200, "Admin added successfully.", true));
    else res.send(Response(null, 500, "Failed to add admin!", false));
  } catch (err) {
    next(err);
  }
};

//admin login
export const adminLogin = async (req, res, next) => {
  try {
    if (!req.body.email.match(emailFormat))
      return res.send(Response(null, 500, "Not a valid email!", false));

    const admin = await findUser(req.body.email);
    if (admin === null) {
      return res.send(Response(null, 500, "Admin not found!", false));
    } else {
      if (admin[0].userType !== "Admin") {
        return res.send(Response(null, 500, "Not an admin!", false));
      }
      if (await bcrypt.compare(req.body.password, admin[0].password)) {
        const result = await UserModel.findOneAndUpdate(
          {
            _id: admin[0]._id,
          },
          {
            $set: {
              isActive: true,
            },
          },
          { new: true }
        );
        if (result) {
          return res.send(Response(result, 200, "Login Sucessfull.", true));
        }
        const payload = { adminDetails: result };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        return res.send(
          Response(
            { adminDetails: result, token: token },
            "Valid admin.",
            200,
            true
          )
        );
      }
      return res.send(Response(null, 500, "Wrong password!", false));
    }
  } catch (error) {
    next(error);
  }
};

//admin logout
export const adminLogout = async (req, res, next) => {
  try {
    let admin = await UserModel.findOne({
      email: req.body.email,
    });
    const responseAfterUpdate = await UserModel.findOneAndUpdate(
      {
        _id: admin[0]._id,
      },
      {
        $set: {
          isActive: false,
        },
      },
      { new: true }
    );
    if (responseAfterUpdate?._id) {
      return res.send(Response(null, 200, "Admin logged out.", true));
    } else {
      return res.send(Response(null, 500, "Failed to logout!", false));
    }
  } catch (error) {
    next(error);
  }
};

//get admin data
export const adminData = async (req, res, next) => {
  try {
    const payload = jwt.verify(req.body.token, process.env.JWT_SECRET);
    let admin = await UserModel.findOne({
      _id: payload.adminDetails._id,
    });
    return res.send(Response(admin, 200, "Valid admin details.", true));
  } catch (error) {
    next(error);
  }
};

//send reset password mail
export const setAdminPassword = async (req, res, next) => {
  try {
    if (!req.body.email.match(emailFormat)) {
      return res.send(Response(null, 500, "Invalid email address!", false));
    }
    let admin = await UserModel.findOne({
      email: req.body.email,
    });
    if (admin === null) {
      return res.send(Response(null, 500, "Admin not found!", false));
    }
    if (admin[0].userType !== "Admin") {
      return res.send(Response(null, 500, "Not an admin!", false));
    }
    const secret = process.env.JWT_SECRET + admin[0].password;
    const payload = {
      email: req.body.email,
      id: admin[0]._id,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "5m" });
    const link = `http://localhost:3000/admin/reset-password/${admin[0]._id}/${token}`;
    if (await mailer(req.body.email, link)) {
      return res.send(Response(null, 500, "Failed to send email!", false));
    } else {
      return res.send(
        Response(null, 200, `Email send to ${req.body.email}`, false)
      );
    }
  } catch (error) {
    next(error);
  }
};

//reset link validation
export const resetAdminPasswordVarification = async (req, res, next) => {
  const { id, token } = req.params;
  try {
    let admin = await UserModel.findOne({
      _id: id,
    });
    if (admin === null) {
      return res.send(Response(null, 500, "Admin not found!", false));
    }
    if (admin[0] !== "Admin") {
      return res.send(Response(null, 500, "Not an admin!", false));
    }
    const secret = process.env.JWT_SECRET + admin[0].password;
    try {
      jwt.verify(token, secret);
      return res.send(
        Response(
          { email: admin[0].email },
          200,
          "Admin verified for reset password.",
          true
        )
      );
    } catch (error) {
      return res.send(
        Response(null, 500, "Not authenticated to reset password.", false)
      );
    }
  } catch (error) {
    next(error);
  }
};

//reset admin password
export const resetAdminPassword = async (req, res, next) => {
  try {
    if (!req.body.email.match(emailFormat)) {
      return res.send(Response(null, 500, "Not a valid email!", false));
    }
    let admin = await UserModel.findOne({
      email: req.body.email,
    });
    const secret = process.env.JWT_SECRET + admin[0].password;
    try {
      const payload = jwt.verify(req.body.token, secret);
      const responseAfterUpdate = await UserModel.findOneAndUpdate(
        {
          _id: payload.id,
        },
        {
          $set: {
            password: await bcrypt.hash(req.body.newPassword, config.saltValue),
          },
        }
      );
      if (resAfterUpdate?._id) {
        return res.send(
          Response(null, 200, "Password reset successfully.", true)
        );
      } else {
        return res.send(
          Response(null, 500, "Failed to reset password!", false)
        );
      }
    } catch (error) {
      return res.send(Response(null, 500, "Token validation failed!", false));
    }
  } catch (error) {
    next(error);
  }
};
