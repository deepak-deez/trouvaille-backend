import nodemailer from "nodemailer";
import env from "dotenv";

env.config();

const sendMail = async (userName, emailId, link) => {
  // let testAccount = await nodemailer.createTestAccount();
  console.log("UserName:", userName);

  nodemailer
    .createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: process.env.SENDER_MAIL2,
        pass: process.env.MAIL_PASSWORD2,
      },
    })
    .sendMail(
      {
        from: `"Trouvaille" <${process.env.SENDER_MAIL2}>`,
        to: `${emailId}`,
        subject: "Reset password",
        text: `Click reset password link below!`,
        html: `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <!-- <script src="https://cdn.tailwindcss.com"></script> -->
            <!-- <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"></script> -->
            <title>Password Reset</title>
            <style>
              html body .reset-mail {
                display: flex;
                flex-direction: column !important;
                margin-left: auto;
                margin-right: auto;
                padding: 2rem;
                text-align: center;
                max-width: 50rem;
                align-items: center;
                font-size: 1.3rem;
                font-weight: 500;
              }
              .mail {
                margin-bottom: 1.5rem;
                display: flex;
                width: 100%;
                justify-content: space-between;
              }
              .mail-title {
                text-align: start;
                font-size: 2rem;
                font-weight: bold;
              }
              .receiver-name {
                margin-bottom: 1.5rem;
              }
              .mail-para1 {
                margin-bottom: 0.75rem;
              }
              .reset-button {
                max-width: 30rem;
                border-radius: 2rem;
                background: #cd5047;
                padding: 1rem 3rem;
                text-align: center;
              }
              .reset-button a {
                font-weight: bold;
                color: white;
                font-size: large;
                text-decoration: none;
              }
              .mail-para2 {
                margin: 1.5rem 0rem;
              }
              .mail-bottom {
                font-size: large;
                font-weight: bold;
                line-height: 0;
              }
              h6 {
                margin: 0;
                line-height: 10px;
                font-weight: 200;
              }
            </style>
          </head>
          <body>
            <section class="reset-mail">
              <div class="mail">
                <div class="mail-title">Reset your Trouvaille Password</div>
                <img
                  src="https://i.ibb.co/JmMBM8t/Group-3.png"
                  alt="Trouvaille image"
                />
              </div>
              <p class="receiver-name">Hi ${userName},</p>
              <p class="mail-para1">
                We're sending you this email because you requested a password reset.
                Click on this link to create a new password:
              </p>
              <div class="reset-button">
                <a href="${link}">Set a new password</a>
              </div>
              <p class="mail-para2">
                If you didn't request a password reset, you can ignore this email. Your
                password will not be changed.
              </p>
              <h2 class="mail-bottom">Trouvaille</h2>
              <h6>Front-facing Website</h6>
            </section>
          </body>
        </html>
        `,
      },
      (error) => {
        return error;
      }
    );
};

export default sendMail;
