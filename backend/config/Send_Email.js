const nademailer = require('nodemailer')


const Send_Email = async(to, subject, text, html) => {
    const instance = nademailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        secure: true,
        port: 465,
        auth: {
            user: process.env.GMAIL,
            pass: process.env.PASSWORD
        }
    })
    try {
        const data = {
            from: process.env.GMAIL,
            to: to,
            subject: subject,
            text: text,
            html: html
        }
        const send = await instance.sendMail(data)
        if (send) {
            console.log('Email sent successfully')
            return true
        } else {
            console.log('Failed to send email')
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}


module.exports = Send_Email