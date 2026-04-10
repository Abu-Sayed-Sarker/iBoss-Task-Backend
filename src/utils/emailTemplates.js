export const otpTemplate = (otp, name) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Security Verification</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #ffffff;
                margin: 0;
                padding: 0;
                color: #333333;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                background-color: #ffffff;
            }
            .header {
                background-color: #438e14;
                color: #ffffff;
                padding: 20px;
                text-align: center;
                border-radius: 8px;
                margin-bottom: 30px;
            }
            .header h1 {
                margin: 0;
                font-size: 22px;
                font-weight: 500;
            }
            .content {
                padding: 0 10px;
                line-height: 1.5;
                font-size: 15px;
            }
            .greeting {
                margin-bottom: 20px;
            }
            .otp-container {
                text-align: center;
                margin: 40px 0;
            }
            .otp-box {
                display: inline-block;
                padding: 20px 40px;
                font-size: 42px;
                font-weight: 500;
                color: #438e14;
                background-color: #f0f7eb;
                border: 2px dashed #438e14;
                border-radius: 8px;
                letter-spacing: 12px;
                padding-right: 28px; /* Offset the last letter spacing */
            }
            .expiry-info {
                margin: 25px 0;
                color: #555555;
            }
            .security-disclaimer {
                margin-top: 25px;
                color: #555555;
            }
            .security-notice {
                margin-top: 25px;
                color: #333333;
            }
            .security-notice p {
                margin: 5px 0;
            }
            .closing {
                margin-top: 30px;
                line-height: 1.6;
            }
            .footer {
                margin-top: 40px;
                background-color: #f8f9fa;
                padding: 20px;
                text-align: center;
                font-size: 13px;
                color: #999999;
                border-radius: 4px;
            }
            b, strong {
                font-weight: 600;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Security Verification</h1>
            </div>
            
            <div class="content">
                <p class="greeting">Hello ${name || "User"}</p>
                
                <p>We received a request to verify your <strong>MessMate</strong> account. To proceed, please use the following <strong>5-digit One-Time Password (OTP)</strong>:</p>
                
                <div class="otp-container">
                    <div class="otp-box">${otp}</div>
                </div>
                
                <p class="expiry-info">⏱️ This OTP is valid for <strong>5 minutes</strong> only. Once expired, you'll need to request a new code.</p>
                
                <p class="security-disclaimer">If you did not initiate this request, please ignore this email. If you believe your account security may be at risk, we recommend contacting our support team immediately.</p>
                
                <div class="security-notice">
                    <p>🔐 <strong>Important Security Notice</strong></p>
                    <p>For your protection, never share this OTP with anyone. <strong>MessMate</strong> will never ask for your password or verification code via email, phone, or message.</p>
                </div>
                
                <div class="closing">
                    <p>Thank you for trusting MessMate to manage your mess smarter and simpler.</p>
                    <p>Warm regards,<br>
                    <strong>MessMate Team</strong></p>
                </div>
            </div>
            
            <div class="footer">
                &copy; ${new Date().getFullYear()} MessMate. All rights reserved.
            </div>
        </div>
    </body>
    </html>
  `;
};
