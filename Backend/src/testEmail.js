require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });

const sendEmail = require("./utils/sendEmail");

(async () => {
  try {
    console.log("SMTP_USER:", process.env.SMTP_USER);
    console.log("SMTP_PASS:", process.env.SMTP_PASS ? "LOADED" : "MISSING");

    await sendEmail({
      to: process.env.SMTP_USER, // send test mail to yourself
      subject: "SMTP Test Email",
      text: "Email system is working correctly 🎉",
    });

    console.log("✅ Test email sent successfully");
  } catch (err) {
    console.error("❌ Error sending email:", err.message);
  }
})();
