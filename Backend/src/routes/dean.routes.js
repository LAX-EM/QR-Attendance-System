const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const dean = require("../controllers/dean.controller");

router.post(
  "/register-lecturer",
  auth(["DEAN"]),
  dean.registerLecturer
);

router.post(
  "/register-student",
  auth(["DEAN", "LECTURER"]),
  dean.registerStudent
);

module.exports = router;
