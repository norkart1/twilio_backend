const express = require("express");
const { sendSMS } = require("../controllers/smsController");

const router = express.Router();

router.post("/", sendSMS); // POST route to send SMS

module.exports = router;
