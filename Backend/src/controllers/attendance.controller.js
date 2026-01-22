const Attendance = require("../models/Attendance");
const LectureSession = require("../models/LectureSession");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

/**
 * Submit attendance (QR or Manual)
 */
exports.submitAttendance = async (req, res) => {
  try {
    const { qrToken, pin } = req.body;
    const studentId = req.user.id; // from auth middleware

    // 1️⃣ Find active lecture session
    const session = await LectureSession.findOne({
      qrToken,
      isActive: true
    });

    if (!session) {
      return res.status(404).json({ message: "Invalid lecture session" });
    }

    // 2️⃣ Check QR expiry (5 minutes)
    if (new Date() > session.qrExpiresAt) {
      return res.status(400).json({ message: "QR code expired" });
    }

    // 3️⃣ Check PIN validity
    if (session.currentPin !== pin) {
      return res.status(400).json({ message: "Invalid PIN" });
    }

    if (new Date() > session.pinExpiresAt) {
      return res.status(400).json({ message: "PIN expired" });
    }

    // 4️⃣ Prevent duplicate attendance
    const existing = await Attendance.findOne({
      studentId,
      lectureSessionId: session._id
    });

    if (existing) {
      return res.status(409).json({ message: "Attendance already submitted" });
    }

    // 5️⃣ Create attendance
    const attendance = await Attendance.create({
      studentId,
      lectureSessionId: session._id,

      moduleCode: session.moduleCode,
      lectureTopic: session.lectureTopic,
      lectureDate: session.lectureDate,
      timePeriod: session.timePeriod,
      location: session.location,
      lecturerName: session.lecturerName,

      submissionMethod: "QR"
    });

    // 6️⃣ Send email confirmation
    const student = await User.findById(studentId);

    if (student?.email) {
      await sendEmail({
        to: student.email,
        subject: "Attendance Submitted Successfully",
        html: `
          <h3>Attendance Confirmed</h3>
          <p><b>Module:</b> ${session.moduleCode}</p>
          <p><b>Topic:</b> ${session.lectureTopic}</p>
          <p><b>Date:</b> ${session.lectureDate.toDateString()}</p>
          <p><b>Time:</b> ${session.timePeriod}</p>
          <p><b>Location:</b> ${session.location}</p>
          <p>Status: <b>Present</b></p>
        `
      });
    }

    res.status(201).json({
      message: "Attendance submitted successfully",
      attendanceId: attendance._id
    });

  } catch (error) {
    console.error("Attendance submit error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
