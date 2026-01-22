const router = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const attendanceController = require("../controllers/attendance.controller");

// Student submit attendance
router.post(
  "/submit",
  authMiddleware(["STUDENT"]),
  attendanceController.submitAttendance
);

module.exports = router;
