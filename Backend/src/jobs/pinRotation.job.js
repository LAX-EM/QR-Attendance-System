const LectureSession = require("../models/LectureSession");
const { generatePin } = require("../utils/generatePin");

const startPinRotation = () => {
  setInterval(async () => {
    try {
      const now = new Date();

      // Only active sessions whose QR hasn't expired
      const sessions = await LectureSession.find({
        isActive: true,
        qrExpiresAt: { $gt: now },
      });

      for (const session of sessions) {
        // Rotate PIN if expired
        if (session.pinExpiresAt < now) {
          session.currentPin = generatePin();
          session.pinExpiresAt = new Date(Date.now() + 30 * 1000); // 30 sec
          await session.save();
          console.log(`Rotated PIN for session ${session._id}: ${session.currentPin}`);
        }
      }
    } catch (err) {
      console.error("PIN rotation error:", err.message);
    }
  }, 5000); // check every 5 seconds
};

module.exports = startPinRotation;
