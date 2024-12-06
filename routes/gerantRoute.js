const express = require("express");
const router = express.Router();
const gerantController = require("../controllers/gerantController");
const verifyToken = require("../middlewares/verifyToken");

module.exports = router;
