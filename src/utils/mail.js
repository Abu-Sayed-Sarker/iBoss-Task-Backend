import nodemailer from "nodemailer";
import env from "../../env.js";

// `
// const options = {
//   email: "",
//   subject: "",
//   message: "",
//   html: "",
// }
// `
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `${env.APP_NAME || "App Name"} <${env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
