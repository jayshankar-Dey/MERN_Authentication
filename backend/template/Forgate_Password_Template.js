const Forgate_password_Template = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>
        Forget Password
    </title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f5f7fa;
            text-align: center;
            padding: 50px;
        }
        
        .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: auto;
        }
        
        .lock-icon {
            width: 100px;
            height: 100px;
        }
        
        h1 {
            font-size: 24px;
            color: #333333;
            margin: 20px 0;
        }
        
        p {
            font-size: 16px;
            color: #666666;
            line-height: 1.5;
        }
        
        a {
            color: #007bff;
            text-decoration: none;
        }
        
        .reset-button {
            background-color: #f0a500;
            color: #ffffff;
            border: none;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 20px;
        }
        
        .reset-button:hover {
            background-color: #e69500;
        }
        #img {
            margin-left: auto;
            margin-right: auto;
            border-radius:10rem
        }
    </style>
</head>

<body>
    <div class="container">
        <img id="img" alt="Lock icon with a question mark" class="lock-icon" height="100" src="https://storage.googleapis.com/a1aa/image/exqr7fHMQ6iECke92dMrRhf828MIqLGUPhk1Sayfl2X3r5zdC.jpg" width="100" />
        <h1>
            Forget password ?
        </h1>
        <p>
            If you've lost your password or wish to reset it, use the link below to get started:
        </p>
        <a href="#">
           https://Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.
          </a>
        <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation.Lorem ipsum dolor sit amet, consectetuer adipiscing
            elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation.
        </p>
        <a href="{#link}" class="reset-button">
            Reset Your Password
            </a>
    </div>
</body>

</html>
`

module.exports = Forgate_password_Template