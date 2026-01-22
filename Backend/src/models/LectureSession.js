const mongoose = require("mongoose");

const lectureSessionSchema = new mongoose.Schema(
  {
    lecturerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    moduleCode: { type: String, required: true },
    lectureTopic: { type: String, required: true },
    lectureDate: { type: Date, required: true },
    timePeriod: { type: String, required: true },
    location: { type: String, required: true },
    lecturerName: { type: String, required: true },

    qrToken: { type: String, required: true },
    qrExpiresAt: { type: Date, required: true },

    currentPin: { type: String, required: true },
    pinExpiresAt: { type: Date, required: true },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LectureSession", lectureSessionSchema);
