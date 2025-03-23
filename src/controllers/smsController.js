const twilio = require("twilio");
const Message = require("../models/Message");

const sendSMS = async (req, res) => {
    const { phone, message } = req.body;

    if (!phone || !message) {
        return res
            .status(400)
            .json({ error: "Phone number and message are required." });
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    try {
        const result = await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phone,
        });

        // Save the sent message to MongoDB
        const newMessage = new Message({
            phone,
            message,
            status: "Sent",
        });
        await newMessage.save();

        res.status(200).json({ success: true, sid: result.sid });
    } catch (error) {
        // Save failed message to MongoDB
        const failedMessage = new Message({
            phone,
            message,
            status: "Failed",
        });
        await failedMessage.save();

        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { sendSMS };
