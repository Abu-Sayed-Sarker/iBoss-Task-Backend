export const contactUsMailTemp = (name, email, number, source) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Contact Request</title>
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
          .header h1 {
              margin: 0;
              font-size: 24px;
              font-weight: 600;
          }
          .content {
              padding: 20px 15px;
              line-height: 1.6;
              font-size: 16px;
              color: #444444;
          }
          .greeting {
              font-size: 18px;
              margin-bottom: 15px;
              font-weight: 500;
          }
          .info-box {
              background-color: #e7f1ff;
              padding: 15px 20px;
              border-left: 4px solid #007bff;
              border-radius: 6px;
              margin: 20px 0;
          }
          .info-box p {
              margin: 5px 0;
          }
          .closing {
              margin-top: 25px;
          }
          .closing p {
              margin: 5px 0;
          }
          .footer {
              margin-top: 30px;
              background-color: #f0f2f5;
              padding: 15px;
              text-align: center;
              font-size: 13px;
              color: #888888;
              border-radius: 0 0 8px 8px;
          }
          b, strong {
              font-weight: 600;
          }
          a {
              color: #007bff;
              text-decoration: none;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>New Contact Request</h1>
          </div>
          <div class="content">
              <p class="greeting">Hello Team,</p>
              
              <p>You have received a new contact request through your portfolio website:</p>
              
              <div class="info-box">
                  <p><strong>Name:</strong> ${name || "N/A"}</p>
                  <p><strong>Email:</strong> <a href="mailto:${email || ''}">${email || "N/A"}</a></p>
                  <p><strong>Number:</strong><br>${number || "No number provided"}</p>
                  <p><strong>Platform:</strong> ${source || "N/A"}</p>
              </div>

              <div class="closing">
                  <p>Please respond to this inquiry promptly to ensure a great user experience.</p>
                  <p>Best regards,<br>
                  <strong>Your Tech Company Portfolio</strong></p>
              </div>
          </div>
          <div class="footer">
              &copy; ${new Date().getFullYear()} Tech Company. All rights reserved.
          </div>
      </div>
  </body>
  </html>
  `;
};