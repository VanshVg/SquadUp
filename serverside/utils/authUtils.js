const jwt = require("jsonwebtoken");
require("dotenv").config();

const userModel = require("../models/userModel");

const checkAdmin = async (username, teamCode) => {
  try {
    const admin = await userModel
      .findOne({ username: username })
      .populate("teams.team", "teamCode");
    for (const team of admin.teams) {
      if (team.team.teamCode === teamCode && team.role === "admin") {
        return true;
      }
    }
  } catch (error) {
    throw error;
  }
  return false;
};

const generateJwtToken = async (username, email) => {
  try {
    return await jwt.sign(
      {
        data: {
          username: username,
          email: email,
        },
      },
      process.env.SECRET_TOKEN
    );
  } catch (error) {
    throw error;
  }
};

module.exports = { checkAdmin, generateJwtToken };
