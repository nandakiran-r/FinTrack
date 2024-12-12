const express = require("express");
const { login, createUser } = require("../controller/commonController");

const router = express.Router();

router.post("/login", login);
router.post("/register", createUser);

module.exports = router;
