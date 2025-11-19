
const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// POST: Save user message and bot reply
router.post("/", async (req, res) => {
    const { userMessage } = req.body;

    // Simple bot reply logic
    const botReply = `You said: "${userMessage}"`;

    try {
        const message = new Message({ userMessage, botReply });
        await message.save();
        res.json({ botReply });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// GET: Get last 10 messages
router.get("/", async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 }).limit(10);
        res.json(messages.reverse());
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
