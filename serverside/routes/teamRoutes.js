const express = require("express");

const teamController = require("../controllers/teamController");
const isAuthenticated = require("../middlewares/auth");

const router = express.Router();

router.post("/create", isAuthenticated, teamController.createTeam);

module.exports = router;
