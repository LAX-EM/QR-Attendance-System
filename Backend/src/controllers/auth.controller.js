const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");
const { createResetToken } = require("../utils/passwordReset");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// LOGIN
exports.login = async (req, res) => {
  const { identifier, password } = req.body;

  const user = await User.findOne({
    $or: [{ email: identifier }, { userId: identifier }]
  });

  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = generateToken(user);

  res.json({ token, role: user.role });
};

// LOGOUT
exports.logout = async (req, res) => {
  res.json({ message: "Logout successful" });
};

// FORGOT PASSWORD
exports.forgotPassword = async (req, res) => {
  const { identifier } = req.body;

  const user = await User.findOne({
    $or: [{ email: identifier }, { userId: identifier }]
  });

  if (!user) return res.status(404).json({ message: "User not found" });

  const { token, hashed } = createResetToken();

  user.resetToken = hashed;
  user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 min
  await user.save();

  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

  // send email
  await sendEmail(user.email, "QR Attendance Password Reset", 
    `Hello ${user.name || user.userId},\n\nClick this link to reset your password:\n\n${resetLink}\n\nThis link expires in 15 minutes.`
  );

  res.json({ message: "Password reset email sent" });
};

// RESET PASSWORD
exports.resetPassword = async (req, res) => {
  const hashed = crypto.createHash("sha256").update(req.params.token).digest("hex");

  const user = await User.findOne({
    resetToken: hashed,
    resetTokenExpiry: { $gt: Date.now() }
  });

  if (!user) return res.status(400).json({ message: "Token expired or invalid" });

  user.password = await bcrypt.hash(req.body.password, 10);
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;

  await user.save();

  res.json({ message: "Password reset successful" });
};
