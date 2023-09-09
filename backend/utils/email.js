const nodemailer = require('nodemailer')

const sendEmail =async (option) => {

    //setup transport
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    //define email options
    const emailOptions = {
        from: "VehicleManagement<test@test.com>",
        to: option.email,
        subject: option.subject,
        text: option.message
    }

    transport.sendMail(emailOptions)
}

module.exports = { sendEmail }


