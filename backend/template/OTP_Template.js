const OTP_template = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 20px;
        }
        
        .container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        
        .logo {
            max-width: 120px;
        }
        
        .otp-code {
            font-size: 24px;
            font-weight: bold;
            color: #007BFF;
            text-align: center;
            margin: 20px 0;
        }
        
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #888888;
        }
    </style>
</head>

<body>

    <div class="container">
        <div class="header">
            <img src="https://cdn.pixabay.com/photo/2016/06/13/17/30/mail-1454731_640.png" alt="Company Logo" class="logo">
        </div>
        <h2>OTP Verification</h2>
        <p>Your OTP code is:</p>
        <div class="otp-code">{123456}</div>
        <p>If you did not request this code, please ignore this email.</p>
        <div class="footer">
            &copy; 2023 Your Company Name
        </div>
    </div>

</body>

</html>
`
module.exports = OTP_template