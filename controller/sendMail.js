import nodemailer from "nodemailer";
import env from "dotenv";

env.config();

const sendMail = async (emailId, link) => {
  // let testAccount = await nodemailer.createTestAccount();

  nodemailer
    .createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: process.env.SenderMail2,
        pass: process.env.MailPassword2,
      },
    })
    .sendMail(
      {
        from: `"Trouvaille" <${process.env.SenderMail2}>`,
        to: `${emailId}`,
        subject: "Reset password",
        text: `Click reset password link below!`,
        html: `<div>
        <h2>This link is only valid for 15 minutes.</h2>
        <a href="${link}">${link}</a>
        </div>`,
      },
      (error) => {
        return error;
      }
    );
};

export default sendMail;
