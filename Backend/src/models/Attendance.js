const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    // Student who submitted attendance
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Lecture session reference
    lectureSessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LectureSession",
      required: true
    },

    // Lecture snapshot (important for history)
    moduleCode: {
      type: String,
      required: true
    },

    lectureTopic: {
      type: String,
      required: true
    },

    lectureDate: {
      type: Date,
      required: true
    },

    timePeriod: {
      type: String,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    lecturerName: {
      type: String,
      required: true
    },

    // Attendance method
    submissionMethod: {
      type: String,
      enum: ["QR", "MANUAL"],
      required: true
    },

    // Attendance status
    status: {
      type: String,
      enum: ["VALID", "REJECTED"],
      default: "VALID"
    },

    // When attendance was submitted
    submittedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

/**
 * 🚫 Prevent duplicate attendance
 * One student → one lecture → one attendance
 */
attendanceSchema.index(
  { studentId: 1, lectureSessionId: 1 },
  { unique: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);
