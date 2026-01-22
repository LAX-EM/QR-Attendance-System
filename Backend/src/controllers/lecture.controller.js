const LectureSession = require("../models/LectureSession");
const { generatePin } = require("../utils/generatePin");
const { generateQRToken } = require("../utils/generateQR");

const Attendance = require("../models/Attendance");


/**
 * Create lecture session + QR + rotating PIN
 */
exports.createLectureSession = async (req, res) => {
  try {
    const {
      moduleCode,
      lectureTopic,
      lectureDate,
      timePeriod,
      location,
      lecturerName
    } = req.body;

    // 1️⃣ Generate QR token (valid 5 minutes)
    const qrToken = generateQRToken();
    const qrExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // 2️⃣ Generate first PIN (valid 30 seconds)
    const pin = generatePin();
    const pinExpiresAt = new Date(Date.now() + 30 * 1000);

    // 3️⃣ Create lecture session
    const session = await LectureSession.create({
      lecturerId: req.user.id,
      moduleCode,
      lectureTopic,
      lectureDate,
      timePeriod,
      location,
      lecturerName,

      qrToken,
      qrExpiresAt,

      currentPin: pin,
      pinExpiresAt,

      isActive: true
    });

    res.status(201).json({
      message: "Lecture session created",
      sessionId: session._id,
      qrUrl: `${process.env.FRONTEND_URL}/attendance/${qrToken}`,
      pin,
      qrExpiresAt,
      pinExpiresAt
    });

  } catch (error) {
    console.error("Create lecture error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMyLectureSessions = async (req, res) => {
  try {
    const lecturerId = req.user.id;

    const sessions = await LectureSession.find({ lecturerId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: sessions.length,
      data: sessions
    });

  } catch (error) {
    console.error("Get lecture sessions error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

/**
 * Lecturer view attendance for a session
 */
exports.getSessionAttendance = async (req, res) => {
  try {
    const lecturerId = req.user.id;
    const { sessionId } = req.params;

    // 1️⃣ Verify session belongs to lecturer
    const session = await LectureSession.findOne({
      _id: sessionId,
      lecturerId
    });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // 2️⃣ Get attendance with student details
    const attendance = await Attendance.find({ sessionId })
      .populate("studentId", "userId name email")
      .sort({ submittedAt: 1 });

    res.json({
      session: {
        moduleCode: session.moduleCode,
        lectureTopic: session.lectureTopic,
        lectureDate: session.lectureDate,
        timePeriod: session.timePeriod,
        location: session.location,
        lecturerName: session.lecturerName
      },
      totalPresent: attendance.length,
      attendance
    });

  } catch (error) {
    console.error("View attendance error:", error);
    res.status(500).json({ message: "Server error" });
  }
};