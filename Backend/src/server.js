const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const startPinRotation = require("./jobs/pinRotation.job");


dotenv.config();

const app = express();
connectDB();



app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" }));
app.use(express.json());

// ROUTES
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/dean", require("./routes/dean.routes"));
app.use("/api/lecture", require("./routes/lecture.routes"));
app.use("/api/attendance", require("./routes/attendance.routes"));


// TEST
app.get("/", (req, res) => res.send("API Running..."));

startPinRotation();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
