const express = require("express");

const teamController = require("../controllers/teamController");
const isAuthenticated = require("../middlewares/auth");

const router = express.Router();

router.post("/create", isAuthenticated, teamController.createTeam);
router.get("/myTeams", isAuthenticated, teamController.myTeams);

module.exports = router;
