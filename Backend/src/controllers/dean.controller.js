const User = require("../models/User");
const bcrypt = require("bcryptjs");

// REGISTER LECTURER
exports.registerLecturer = async (req, res) => {
  try {
    const { name, userId, email, password } = req.body;

    // 1️⃣ Validate input
    if (!name || !userId || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ Check duplicates
    const exists = await User.findOne({
      $or: [{ userId }, { email }]
    });

    if (exists) {
      return res.status(409).json({ message: "User ID or Email already exists" });
    }

    // 3️⃣ Hash password
    const hashed = await bcrypt.hash(password, 10);

    // 4️⃣ Create lecturer
    const lecturer = await User.create({
      name,
      userId,
      email,
      password: hashed,
      role: "LECTURER",
      createdBy: req.user ? req.user._id : null // dean's ObjectId
    });

    res.status(201).json({ message: "Lecturer registered successfully", lecturer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// REGISTER STUDENT
exports.registerStudent = async (req, res) => {
  try {
    const { name, userId, email, password } = req.body;

    // 1️⃣ Validate input
    if (!name || !userId || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ Check duplicates
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
      createdBy: req.user ? req.user._id : null
    });

    res.status(201).json({ message: "Student registered successfully", student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
