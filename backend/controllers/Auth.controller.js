//
const Send_Email = require('../config/Send_Email');
const Users = require('../model/user.model');
const jwt = require('jsonwebtoken');
const OTP_template = require('../template/OTP_Template');
const Forgate_password_Template = require('../template/Forgate_Password_Template');
class AuthController {
    /////////////////////////////////////////////
    Register = async(req, res, next) => {
            try {
                const { name, email, password } = req.body;
                const otp = Math.floor(Math.random() * 900000)

                if (!email && !name && !password) return res.json({ message: "all fields are required", success: false })

                const find = await Users.findOne({ email: email })
                if (find) {
                    if (find.is_verify) {
                        return res.json({ message: "Email Alrady Register", success: false })
                    } else {
                        find.email = email;
                        find.password = password;
                        find.name = name;
                        find.otp = otp
                        await find.save()

                        const secret = find._id + process.env.JWT_SECRET
                        const token = jwt.sign({ email: find.email }, secret, {
                            expiresIn: 2 * 60
                        })
                        await Send_Email(email, 'Verify your Email', 'Cannot send otp from anather persion', OTP_template.replace("{123456}", otp))
                        return res.json({
                            success: true,
                            message: 'OTP sent successfully',
                            token,
                            id: find._id
                        });
                    }
                } else {
                    const user = await Users.create({ name, email, password, otp })
                    const secret = user._id + process.env.JWT_SECRET
                    const token = jwt.sign({ email: user.email }, secret, {
                        expiresIn: 2 * 60
                    })
                    await Send_Email(email, 'Verify your Email', 'Cannot send otp from anather persion', OTP_template.replace("{123456}", otp))
                    return res.json({
                        success: true,
                        message: 'OTP sent successfully',
                        token,
                        id: user._id
                    });
                }

            } catch (error) {
                next(error)
            }
        }
        ////////////////////////////////////////////////////
    Otp_Verify = async(req, res, next) => {
        try {
            const { token, id, otp } = req.body
            const secret = id + process.env.JWT_SECRET
            const { email } = await jwt.verify(token, secret)
            if (email) {
                const user = await Users.findOne({ email })
                if (Number(user.otp) !== Number(otp)) return res.json({
                    success: false,
                    message: 'Please enter valide otp',
                });
                const token = await user.generateToken("15d")
                user.is_verify = true;
                await user.save()
                console.log(token)
                return res.json({
                    success: true,
                    message: 'Register successfully',
                    token
                });
            } else {
                return res.json({
                    success: false,
                    message: 'OTP Expire'
                });
            }
        } catch (error) {
            if (error.message == "jwt malformed") {
                return res.json({
                    success: false,
                    message: "Please enter Valide url",
                });
            }
            if (error.message == "jwt expired") {
                return res.json({
                    success: false,
                    message: "Otp is expired",
                });
            }
            next(error)
        }
    }

    /////////////////////////////////////////////////////////////
    Login = async(req, res, next) => {
            try {
                const { email, password } = req.body
                console.log(email, password)
                const user = await Users.findOne({
                    email: email
                })
                if (!user) return res.json({ success: false, message: "Email is not register" })
                if (!user.is_verify) return res.json({ success: false, message: "the Email not register" })
                const compaire = await user.compairePassword(password)
                if (!compaire) return res.json({ success: false, message: "Invalid Email or Password" })
                const token = await user.generateToken("15d")
                return res.json({
                    success: true,
                    message: "Login successfully",
                    token
                })
            } catch (error) {

            }
        }
        ///////////////////////////////////////////////////////////////
    Get_Forgate_password_Link = async(req, res, next) => {
            try {
                const { email } = req.body;

                const user = await Users.findOne({ email })
                if (!user) return res.json({ success: false, message: "Email is not register" })
                const secret = user._id + process.env.JWT_SECRET
                const token = jwt.sign({ email: user.email }, secret, {
                    expiresIn: 2 * 60
                })
                const url = `http://localhost:5173/forget/password/${token}/${user._id}`
                await Send_Email(email, 'Reset Password', 'Cannot send Link from anather persion', Forgate_password_Template.replace('{#link}', `${url}`))

                res.json({
                    success: true,
                    message: "send Forgate password Link successfully",
                    url
                })
            } catch (error) {
                next(error)
            }
        }
        ///////////////////////////////////////////////////////////////
    Forgate_password = async(req, res, next) => {
        try {
            const { password, cnfpassword, token, id } = req.body
            if (password !== cnfpassword) return res.json({ success: false, message: "password and confirm password are not match " })
            const secret = id + process.env.JWT_SECRET
            const { email } = await jwt.verify(token, secret)
            if (email) {
                const user = await Users.findOne({ email })
                user.password = password;
                await user.save()
            }
            res.json({
                success: true,
                message: "Password reset successfully",
            })
        } catch (error) {
            if (error.message == "jwt malformed") {
                return res.json({
                    success: false,
                    message: "The Link is Expire",
                });
            }
            if (error.message == "jwt expired") {
                return res.json({
                    success: false,
                    message: "The Link is Expire",
                });
            }
            next(error)
        }
    }

    ///////////////////////////////////////////////////////////////
    Verify_Gmail_auth = async(req, res, next) => {
        try {
            const { token } = req.body
            if (!token) return res.json({ success: false, message: "please enter valide url" })
            const { id } = await jwt.verify(token, process.env.JWT_SECRET)
            if (id) {
                res.json({
                    success: true,
                    message: "Email verifify successFully",
                })
            }
        } catch (error) {
            if (error.message == "jwt malformed") {
                return res.json({
                    success: false,
                    message: "Please enter valide url",
                });
            }
            if (error.message == "jwt expired") {
                return res.json({
                    success: false,
                    message: "Please enter valide url",
                });
            }
            next(error)
        }
    }

}

module.exports = new AuthController()