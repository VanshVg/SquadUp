const randomstring = require("randomstring");

const teamModel = require("../models/teamModel");
const userModel = require("../models/userModel");

const createTeam = async (req, res) => {
  const { name, description } = req.body;
  const { username } = req.user.data;
  if (!name || !description) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  let teamCode = randomstring.generate({
    length: 6,
    charset: "alphanumeric",
  });

  try {
    const user = await userModel.findOne({ username: username });
    let team = new teamModel({
      name: name,
      description: description,
      teamCode: teamCode,
      members: [{ user: user._id, role: "admin" }],
    });
    const savedTeam = await team.save();
    await userModel.updateOne(
      { _id: user._id },
      { $push: { teams: { team: savedTeam._id, role: "admin" } } }
    );
    res.status(200).json({
      message: "Team created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while creating a team",
    });
  }
};

const myTeams = async (req, res) => {
  const { username } = req.user.data;
  try {
    const user = await userModel.findOne({ username: username });
    const teams = await teamModel.find({
      _id: { $in: user.teams.map((team) => team.team) },
    });
    if (teams.length === 0) {
      return res.status(404).json({
        message: "User isn't part of any team",
      });
    }
    res.status(200).json({
      teams,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while showing all teams",
    });
  }
};

module.exports = { createTeam, myTeams };
