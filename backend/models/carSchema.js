const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    name: { type: String, default: null },
    description: { type: String, default: null },
    price: { type: Number },
    availableQuantity: { type: Number },
    resetToken: { type: String, default: null },
}, { timestamps: true });

module.exports = mongoose.model("car", carSchema); 