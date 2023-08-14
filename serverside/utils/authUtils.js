const userModel = require("../models/userModel");

const checkAdmin = async (username, teamCode) => {
  const admin = await userModel.findOne({ username: username }).populate("teams.team", "teamCode");
  for (const team of admin.teams) {
    if (team.team.teamCode === teamCode && team.role === "admin") {
      return true;
    }
  }
  return false;
};

module.exports = { checkAdmin };
