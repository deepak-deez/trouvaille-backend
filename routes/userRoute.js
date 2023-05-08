import express from "express";

export const app = express();
import * as auth from "../database/auth/userAuth.js";

app.post("/register/:user", auth.userRegister);
app.post("/login/:user", auth.userLogin);
app.post("/user-logout", auth.userLogout);
app.get("/database/:user", auth.userData);
app.post("/send-reset-mail/:user", auth.sendResetMail);
app.get("/reset-password/:user/:id/:token", auth.resetPasswordValidation);
app.post("/set-password", auth.setPassword);
