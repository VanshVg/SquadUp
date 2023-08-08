const express = require("express");

const teamController = require("../controllers/teamController");
const isAuthenticated = require("../middlewares/auth");

const router = express.Router();

router.post("/create", isAuthenticated, teamController.createTeam);
router.get("/myTeams", isAuthenticated, teamController.myTeams);
router.get("/team/:teamCode", isAuthenticated, teamController.teamDetail);
router.put("/updateTeam/:teamCode", isAuthenticated, teamController.updateTeam);
router.delete("/deleteTeam/:teamCode", isAuthenticated, teamController.deleteTeam);
router.post("/joinTeam", isAuthenticated, teamController.joinTeam);

module.exports = router;
