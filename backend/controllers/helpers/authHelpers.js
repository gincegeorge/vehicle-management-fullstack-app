const Bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRound = process.env.BCRYPT_SALT_ROUND
// const user = require('../../models/userSchema');

// create token
const createToken = (id) => {
    const data = {
        id: id,
        date: new Date()
    }
    return jwt.sign(data, process.env.JWT_SECRET_KEY)

}

// hash password
const hashText = async (text) => {
    try {
        const salt = await Bcrypt.genSalt(parseInt(saltRound));
        const hash = await Bcrypt.hash(text, salt);
        return hash
    } catch (error) {
        throw new Error(error)
    }
}

// compare password
const comparePassword = async (Enteredpassword, dbPassword) => {
    const validPassword = await Bcrypt.compare(Enteredpassword, dbPassword)
    if (validPassword) {
        return true
    } else {
        throw new Error('Invalid password')
    }
}

// verify jwt token
const verifyJWT = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        try {
            const userData = await user.findOne({ _id: decoded.id })
            if (userData) {
                return true
            } else {
                throw new Error(`Could not find user`)
            }
        } catch (error) {
            console.log(error)
            return false
        }
    } catch (error) {
        console.console.log(error);
        return false
    }
}

// generate auth error
const generateAuthError = (err) => {
    let error = { email: "", phone: "", password: "" }

    console.log(err.message)

    if (err.code === 11000) {

        const keys = Object.keys(err.keyValue)

        console.log(keys);

        if (keys.includes('email')) {
            error.email = "This email is already registered."
        } else if (keys.includes('phone')) {
            error.phone = 'This phone number is already registered.'
        }
    }

    if (err.message.includes("Invalid password")) {
        error.password = "Invalid password"
    }

    return error
}


module.exports = {
    createToken,
    hashText,
    comparePassword,
    verifyJWT,
    generateAuthError
}