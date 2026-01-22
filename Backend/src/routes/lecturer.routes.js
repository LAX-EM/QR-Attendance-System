const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const lecturer = require("../controllers/lecturer.controller");

router.post("/student", auth, role("LECTURER"), lecturer.registerStudent);

module.exports = router;
