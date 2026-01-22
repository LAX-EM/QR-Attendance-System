require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

(async () => {
  try {
    // 1️⃣ Connect DB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // 2️⃣ Check if dean already exists
    const existingDean = await User.findOne({ role: "DEAN" });
    if (existingDean) {
      console.log("⚠️ Dean already exists");
      process.exit();
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash("Dean@123", 10);

    // 4️⃣ Create dean
    await User.create({
      name: "System Dean",
      userId: "DEAN001",
      email: "dean@university.lk",
      password: hashedPassword,
      role: "DEAN"
    });

    console.log("🎓 Dean (Super Admin) seeded successfully");
    process.exit();

  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
})();
