const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// LOGIN / LOGOUT
router.post("/login", authController.login);
router.post("/logout", authMiddleware(), authController.logout);

// PASSWORD RESET
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:token", authController.resetPassword);

module.exports = router;
