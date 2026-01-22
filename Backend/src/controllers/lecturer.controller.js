const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.registerStudent = async (req, res) => {
  try {
    const { name, userId, email, password } = req.body;

    // 1️⃣ Validate input
    if (!name || !userId || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ Check for duplicates (userId or email)
    const exists = await User.findOne({
      $or: [{ userId }, { email }]
    });

    if (exists) {
      return res.status(409).json({ message: "User ID or Email already exists" });
    }

    // 3️⃣ Hash password
    const hashed = await bcrypt.hash(password, 10);

    // 4️⃣ Create student
    const student = await User.create({
      name,
      userId,
      email,
      password: hashed,
      role: "STUDENT",
      createdBy: req.user ? req.user._id : null // track which dean created this student
    });

    // 5️⃣ Respond with success
    res.status(201).json({ message: "Student registered successfully", student });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
