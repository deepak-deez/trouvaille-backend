import express from "express";

export const app = express();
import * as auth from "../auth/userAuth.js";

app.post("/register/:user", auth.userRegister);
app.post("/login/:user", auth.FrontendUserLogin);
app.post("/user-logout", auth.FrontendUserLogout);
app.get("/database/:user", auth.FrontendUserData);
app.post("/send-reset-mail/:user", auth.sendResetMail);
app.get("/reset-password/:user/:id/:token", auth.resetPasswordValidation);
app.post("/set-password", auth.setPassword);
