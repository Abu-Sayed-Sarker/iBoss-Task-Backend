import asyncHandler from "../../utils/asyncHandler.js";
import sendEmail from "../../utils/mail.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { contactUsMailTemp } from "../../utils/contactMailTemp.js";
import env from "../../../env.js";

export const sendContactInformation = asyncHandler(async (req, res) => {
  const { name, email, number, source } = req.body;

/// check for empty fields 
  if (!name) {
    throw new ApiError(400, "Name is required");
  }

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  if (!number) {
    throw new ApiError(400, "Number is required");
  }

  if (!source) {
    throw new ApiError(400, "Source is required");
  }

  const html = contactUsMailTemp(name, email, number, source);

  await sendEmail({
    email: env.RECEIVER_MAIL,
    subject: "Contact Form Submission",
    message: `Name: ${name}\nEmail: ${email}\nNumber: ${number}\nSource: ${source}`,
    html: html,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Message sent successfully"));
});



export const subscribeByEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiError(400, "Email is required");
  }
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Subscribe to Newsletter</title>
      <style>
          body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #f4f6f9;
              margin: 0;
              padding: 0;
              color: #333333;
          }
          .container {
              max-width: 600px;
              margin: 30px auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          }
          .header {
              background-color: #007bff;
              color: #ffffff;
              padding: 20px;
              text-align: center;
              border-radius: 8px 8px 0 0;
          }
          .content {
              padding: 20px;
              text-align: center;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Subscribe to Newsletter</h1>
          </div>
          <div class="content">
              <p>Thank you for subscribing to our newsletter. We will keep you updated with the latest news and offers.</p>
          </div>
      </div>
  </body>
  </html>
  `;
  await sendEmail({
    email: email,
    subject: "Subscribe to Newsletter",
    message: `Email: ${email}`,
    html: html,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Message sent successfully"));
});


export const bookACall = asyncHandler(async (req, res) => {
  const {phone} = req.body;
 if (!phone) {
    throw new ApiError(400, "Phone number is required");
  }
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Subscribe to Newsletter</title>
      <style>
          body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #f4f6f9;
              margin: 0;
              padding: 0;
              color: #333333;
          }
          .container {
              max-width: 600px;
              margin: 30px auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          }
          .header {
              background-color: #007bff;
              color: #ffffff;
              padding: 20px;
              text-align: center;
              border-radius: 8px 8px 0 0;
          }
          .content {
              padding: 20px;
              text-align: center;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Book a Call</h1>
          </div>
          <div class="content">
              <p>Thank you for subscribing to our newsletter. We will keep you updated with the latest news and offers.</p>
          </div>
      </div>
  </body>
  </html>
  `;
  await sendEmail({
    email: env.RECEIVER_MAIL,
    subject: "Book a Call",
    message: `Phone: ${phone}`,
    html: html,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Message sent successfully"));

})
