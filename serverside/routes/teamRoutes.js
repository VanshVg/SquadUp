const express = require("express");

const teamController = require("../controllers/teamController");
const isAuthenticated = require("../middlewares/auth");

const router = express.Router();

router.post("/create", isAuthenticated, teamController.createTeam);
router.get("/myTeams", isAuthenticated, teamController.myTeams);
router.get("/team/:teamId", isAuthenticated, teamController.teamDetail);
router.put("/updateTeam/:teamId", isAuthenticated, teamController.updateTeam);
router.delete("/deleteTeam/:teamId", isAuthenticated, teamController.deleteTeam);
router.post("/joinTeam", isAuthenticated, teamController.joinTeam);
router.post("/leaveTeam/:teamId", isAuthenticated, teamController.leaveTeam);
router.get("/:teamCode/members", isAuthenticated, teamController.showAllMembers);
router.delete("/:teamId/removeMember/:userId", isAuthenticated, teamController.removeMember);

module.exports = router;
