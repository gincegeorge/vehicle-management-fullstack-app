const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    name: { type: String, },
    description: { type: String, },
    price: { type: Number },
    availableQuantity: { type: Number },
    manufacture: { type: String, },
    model: { type: Number, },
    secondaryImages: { type: Array }
}, { timestamps: true });

module.exports = mongoose.model("car", carSchema); 