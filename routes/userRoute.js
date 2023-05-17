import express from "express";

export const app = express();
import * as auth from "../database/auth/userAuth.js";

app.post("/register/:user", auth.userRegister);
app.post("/update/:user/:id", auth.updateUserDetails);
app.post("/login/:user", auth.userLogin);
app.post("/user-logout", auth.userLogout);
app.get("/database/:user", auth.userData);
app.post("/send-reset-mail/:user", auth.sendResetMail);
app.get("/token-validation/:user/:id/:token", auth.tokenValidation);
app.post("/set-password/:user", auth.setPassword);
