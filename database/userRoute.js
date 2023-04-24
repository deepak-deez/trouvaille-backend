// import { UserModel } from "./userSignup/signUpModel.js";
// import { Router } from "express";
// import express from "express";
// import cors from "cors";
// import bcrypt from "bcrypt";
// import sendMail from "./controller/sendMail.js";

// const userRouter = Router();
// const app = express();
// app.use(cors());

// const passwordhashed = async (text) => {
//   return await bcrypt.hash(text, 12);
// };

// const getUserData = async (emailId) => {
//   return await UserModel.findOne({ email: emailId });
// };

// userRouter.post("/reset-mail", sendMail);

// userRouter.get("/all-users", async (req, res, next) => {
//   const userData = await UserModel.find({});
//   try {
//     res.status(200).send({
//       data: userData,
//       message: "Success",
//       success: true,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// // const usersignIn = async (req, res, next) => {
// //   try {
// //     const userData = await UserModel.findOne({
// //       email: req.body.email,
// //     });

// //     if (userData === null) {
// //       res.send({
// //         data: null,
// //         message: "User not found.",
// //         status: 400,
// //         success: false,
// //       });
// //     } else {
// //       if (await bcrypt.compare(req.body.password, userData.password)) {
// //         const res = await UserModel.findOneAndUpdate(
// //           {
// //             _id: userData._id,
// //           },
// //           {
// //             $set: {
// //               isActive: true,
// //               isVerified: true,
// //             },
// //           },
// //           { new: true }
// //         );
// //         const payload = { userDetails: res };
// //         const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "7d" });
// //         return res.send({
// //           data: { userDetails: res, token: token },
// //           message: "Valid user",
// //           status: 200,
// //           success: true,
// //         });
// //       } else {
// //         return res.send({
// //           data: null,
// //           message: "Wrong password",
// //           status: 400,
// //           success: false,
// //         });
// //       }
// //     }
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// userRouter.get("/frontend-user-login", async (req, res, next) => {
//   // console.log(await getUserData(req.body.email));
//   // const userData = await getUserData(req.body.email);
//   // console.log(userData);
//   // console.log(
//   //   (await bcrypt.compare(req.body.password, userData.password)) &&
//   //     userData.userType === "Frontend-user"
//   // );

//   const userData = await getUserData(req.body.email);
//   const status = bcrypt.compare(userData.password, req.body.password);
//   if (userData === null) {
//     console.log(err);
//     res.status(500).send({
//       message: "User not exist!",
//       success: "false",
//     });
//   } else {
//     console.log(userData);

//     console.log("Status : ", status);
//     if (status) {
//       console.log(req.body);
//       console.log("User data : ", userData);
//       res.status(200).send({
//         data: userData,
//         message: "Success",
//         type: userData.userType,
//         success: true,
//       });
//     } else {
//       console.log(
//         "Status : ",
//         (await bcrypt.compare(req.body.password, userData.password)) &&
//           userData.userType === "Frontend-user"
//       );
//       res.status(500).send({ message: "Incorrect user name or password!" });
//     }
//   }
// });

// userRouter.post("/user-signUp", async (req, res, next) => {
//   try {
//     const userData = await UserModel({
//       userType: "Frontend-user",
//       email: req.body.email,
//       phone: req.body.phone,
//       password: await passwordhashed(req.body.password),
//       isActive: false,
//     });
//     const res = await userData.save();
//     if (res) {
//       res.status(200).send({
//         data: res,
//         message: "Account created!",
//         success: true,
//       });
//     } else {
//       res.status(500).send(new Error("Failed to create account"));
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// export default userRouter;

import express from "express";

export const app = express();
import {
  userRegister,
  FrontendUserLogin,
  FrontendUserLogout,
  FrontendUserData,
  sendResetMail,
  resetPasswordValidation,
  setPassword,
} from "./controller/userAuth.js";

app.post("/user-register", userRegister);
app.post("/user-login", FrontendUserLogin);
app.post("/user-logout", FrontendUserLogout);
app.get("/all-users", FrontendUserData);
app.post("/send-reset-mail", sendResetMail);
app.get("/reset-password/:id/:token", resetPasswordValidation);
app.post("/set-password", setPassword);
