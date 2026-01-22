const express = require("express");
const app = express();
import lectureRoutes from "./routes/lecture.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";




app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/dean", require("./routes/dean.routes"));
app.use("/api/lecturer", require("./routes/lecturer.routes"));
app.use("/api/lecture", lectureRoutes);
app.use("/api/attendance", attendanceRoutes);

module.exports = app;
