const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    resetToken: { type: String, default: null },
    //TODO RESET TOKEN EXPIRES
    // resetTokenExpiries: { type: String, default: null },
}, { timestamps: true });

module.exports = mongoose.model("user", userSchema); 