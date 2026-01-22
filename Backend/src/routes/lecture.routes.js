const router = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const lectureController = require("../controllers/lecture.controller");

// Create lecture session (QR + PIN)
router.post(
  "/create-session",
  authMiddleware(["LECTURER"]),
  lectureController.createLectureSession
);

// Get lecturer sessions
router.get(
  "/my-sessions",
  authMiddleware(["LECTURER"]),
  lectureController.getMyLectureSessions
);
// View attendance of a session
router.get(
  "/session/:sessionId/attendance",
  authMiddleware(["LECTURER"]),
  lectureController.getSessionAttendance
);

module.exports = router;
