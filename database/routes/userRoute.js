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
} from "../auth/userAuth.js";

app.post("/user-register", userRegister);
app.post("/user-login", FrontendUserLogin);
app.post("/user-logout", FrontendUserLogout);
app.get("/all-users", FrontendUserData);
app.post("/send-reset-mail", sendResetMail);
app.get("/reset-password/:id/:token", resetPasswordValidation);
app.post("/set-password", setPassword);
