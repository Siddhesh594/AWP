const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// POST: save user message and return bot reply
router.post("/", async (req, res) => {
    const { userMessage } = req.body;
    if (!userMessage) return res.status(400).json({ error: "No message provided" });

    // simple bot logic
    const botReply = `Bot: You said -> "${userMessage}"`;

    try {
        const message = new Message({ userMessage, botReply });
        await message.save();
        res.json({ botReply });  // important
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// GET: get last 10 messages
router.get("/", async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 }).limit(10);
        res.json(messages.reverse());
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
