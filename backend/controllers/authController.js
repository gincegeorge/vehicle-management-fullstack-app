const { hashText, createToken, generateAuthError, comparePassword } = require("./helpers/authHelpers");
const userSchema = require("../models/userSchema")
const randomstring = require("randomstring");
const sendEmail = require('../utils/email')

//signup
const signUp = async (req, res) => {
    try {

        let { name, email, password } = req.body

        password = await hashText(password)

        const user = await userSchema.create({ name, email, password })

        const token = await createToken(user._id)

        console.log(user)

        res.status(201).json({ created: true, user, token })

    } catch (err) {

        const error = generateAuthError(err)

        console.log(error)

        res.status(409).json({ created: false, error })
    }
}

//login
const login = async (req, res) => {
    const { email, password } = req.body

    const userData = await userSchema.findOne({ email: email })

    if (userData) {
        try {
            const isValid = await comparePassword(password, userData.password)

            if (isValid) {
                const token = await createToken(userData._id)
                res.status(201).json({ created: true, token })
            }

        } catch (err) {
            const error = generateAuthError(err)
            res.status(401).json({ created: false, error })
        }
    } else {
        console.log("Account not found")
        const error = {
            email: "The email address is not valid"
        }
        res.status(404).json({ created: false, error })
    }
}

//verify usertoken
const verifyUserToken = async (req, res) => {
    const data = {
        isVerified: true
    }
    data.isVerified = await verifyJWT(req.body.cookie)
    res.status(200).send(data)
}

//forgot password
const forgotPassword = async (req, res) => {

    const { email } = req.body

    //find user with email
    const user = await userSchema.findOne({ email: email })

    if (user) {
        //create random reset token
        const resetToken = randomstring.generate(20)

        user.resetToken = await hashText(resetToken)

        //update user db
        userSchema.updateOne({ email: user.email }, user).then(() => {
            res.status(201).json({ created: true, })
        })

        //send the token to user in email
        const resentUrl = `${req.protocol}://${req.get('host')}/reset-password`
        console.log(resentUrl);
        
        try {
            sendEmail({})
        } catch (error) {
            console.log(error);
        }

    } else {
        const errorText = 'Account not found'
        console.log(errorText)
        const error = {
            email: errorText
        }
        res.status(404).json({ created: false, error })
    }
}

module.exports = {
    signUp,
    login,
    verifyUserToken,
    forgotPassword
}