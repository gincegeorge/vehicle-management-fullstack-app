const nodemailer = require('nodemailer')

const sendEmail = async (option) => {

    //email config
    const config = {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    }

    //setup transport
    const transport = nodemailer.createTransport(config);

    //define email options
    const emailOptions = {
        from: "VehicleManagement<test@test.com>",
        to: option.email,
        subject: option.subject,
        text: option.message
    }

    await transport.sendMail(emailOptions)
}

module.exports = sendEmail


