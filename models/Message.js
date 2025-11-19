
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    userMessage: { type: String, required: true },
    botReply: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);
