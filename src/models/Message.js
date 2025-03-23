const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    phone: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, default: "Pending" },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", MessageSchema);
