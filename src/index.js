const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/mongo");
const smsRoutes = require("./routes/sms");

dotenv.config(); // Load environment variables
connectDB(); // Connect to MongoDB

const app = express();
app.use(express.json()); // Parse JSON requests

app.use("/sms", smsRoutes); // Register SMS routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
