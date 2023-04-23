import nodemailer from "nodemailer";
import env from "dotenv";

env.config();

const sendMail = async (req, res, next) => {
  let testAccount = await nodemailer.createTestAccount();

  //   console.log(process.env.SenderMail);
  //   console.log(process.env.MailPassword);

  // connect with the smtp
  const transporter = nodemailer
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
        from: '"Trouvaille" <joyrudrabws007@gmail.com>',
        to: "rkphotography272020@gmail.com",
        subject: "Reset Password",
        text: "Your mail has been",
        html: "<b>reset password from link</b>",
      },
      (err) => {
        if (err) {
          res.send({
            data: null,
            message: "Failed to send mail",
            status: 404,
            success: false,
          });
        } else {
          res.send({
            data: null,
            message: `Email message send to joyrudrabws007@gmail.com`,
            status: 200,
            success: true,
          });
        }
      }
    );
};

export default sendMail;
