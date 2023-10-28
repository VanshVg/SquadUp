const randomstring = require("randomstring");

const teamModel = require("../models/teamModel");
const userModel = require("../models/userModel");

const { checkAdmin } = require("../utils/authUtils");
const { getRandomColor, getRandomNumber } = require("../utils/teamUtils");

const createTeam = async (req, res) => {
  console.log("createTeam api called");
  const { name, description } = req.body;
  const { username, firstname, lastname } = req.user.data;
  if (!name) {
    return res.status(400).json({
      type: "field",
      message: "All fields are required",
    });
  }

  let teamCode = randomstring.generate({
    length: 6,
    charset: "alphanumeric",
  });

  let iconColor = getRandomColor();
  let bannerNumber = getRandomNumber(3);

  try {
    const user = await userModel.findOne({ username: username });
    let adminName = firstname + " " + lastname;
    let team = new teamModel({
      name: name,
      description: description,
      teamCode: teamCode,
      admin: adminName,
      members: [{ user: user._id, role: "admin" }],
      iconColor: iconColor,
      bannerUrl: `/images/teamBackground${bannerNumber}.jpg`,
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
      type: "unknown",
      message: "Error while creating a team",
      error: error,
    });
  }
};

const myTeams = async (req, res) => {
  console.log("myTeams api called");
  const { username } = req.user.data;
  try {
    const user = await userModel.findOne({ username: username });
    const teams = await teamModel.find({
      _id: { $in: user.teams.map((team) => team.team) },
    });
    res.status(200).json({
      teams,
    });
  } catch (error) {
    res.status(500).json({
      type: "unknown",
      message: "Error while showing all teams",
      error: error,
    });
  }
};

const teamDetail = async (req, res) => {
  console.log("teamDetail api called");
  const { teamId } = req.params;
  try {
    let team = await teamModel.findOne({ _id: teamId }).populate("members.user", "username");
    console.log(team);

    if (!team) {
      return res.status(404).json({
        type: "not_found",
        message: "Team doesn't exist",
      });
    }

    const membersWithUsername = team.members.map((member) => {
      return {
        user: member.user.username,
        role: member.role,
      };
    });

    res.status(200).json({
      name: team.name,
      description: team.description,
      members: membersWithUsername,
      tasks: team.tasks,
      bannerUrl: team.bannerUrl,
      teamCode: team.teamCode,
    });
  } catch (error) {
    res.status(500).json({
      type: "unknown",
      message: "Error while getting team details",
      error: error,
    });
  }
};

const updateTeam = async (req, res) => {
  console.log("updateTeam api called");
  const { name, description } = req.body;
  const { username } = req.user.data;
  const { teamCode } = req.params;
  try {
    let isAdmin = await checkAdmin(username, teamCode);

    if (!isAdmin) {
      return res.status(401).json({
        type: "unauthorized",
        message: "You are not authorised to make changes",
      });
    }
    if (!name && !description) {
      return res.status(400).json({
        type: "field",
        message: "Atleast one field is required",
      });
    }

    let team = await teamModel.findOne({ teamCode: teamCode });

    if (!team) {
      return res.status(404).json({
        type: "not_found",
        message: "Team doesn't exist",
      });
    }

    const updateData = {};

    if (name) {
      if (name === team.name) {
        return res.status(400).json({
          type: "bad_request",
          message: "Choose different team name from current team name",
        });
      }
      updateData.name = name;
    }
    if (description) {
      if (description === team.description) {
        return res.status(400).json({
          type: "bad_request",
          message: "Choose different team description from current team description",
        });
      }
      updateData.description = description;
    }

    await teamModel.updateOne({ teamCode: teamCode }, { $set: updateData });

    return res.status(200).json({
      message: "Team data updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      type: "unknown",
      message: "Error while updating team",
      error: error,
    });
  }
};

const deleteTeam = async (req, res) => {
  console.log("deleteTeam api called");
  const { username } = req.user.data;
  const { teamId } = req.params;
  console.log(req.params);
  try {
    let isAdmin = await checkAdmin(username, teamId);

    if (!isAdmin) {
      return res.status(401).json({
        type: "unauthorized",
        message: "You're not authorised to delete a team",
      });
    }
    const team = await teamModel.findOne({ _id: teamId });
    if (!team) {
      return res.status(404).json({
        type: "not_found",
        message: "Team doesn't exist",
      });
    }

    for (const member of team.members) {
      const memberUser = await userModel.findOne({ _id: member.user });
      if (memberUser) {
        memberUser.teams = memberUser.teams.filter((teamItem) => {
          return teamItem.team.toString() !== team._id.toString();
        });
        await memberUser.save();
      }
    }

    await teamModel.deleteOne({ _id: teamId });

    return res.status(200).json({
      message: "Team deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      type: "unknown",
      message: "Error while deleting team",
      error: error,
    });
  }
};

const joinTeam = async (req, res) => {
  console.log("joinTeam api called");
  const { teamCode } = req.body;
  const { username } = req.user.data;
  if (!teamCode) {
    return res.status(400).json({
      type: "field",
      message: "All fields are required",
    });
  }
  try {
    let user = await userModel.findOne({ username: username });
    let team = await teamModel.findOne({ teamCode: teamCode });
    if (!team) {
      return res.status(404).json({
        type: "not_found",
        message: "Team doesn't exist",
      });
    }
    for (const teamItem of user.teams) {
      if (teamItem.team.toString() === team._id.toString()) {
        return res.status(409).json({
          type: "conflict",
          message: "You are already part of this team",
        });
      }
    }
    await userModel.updateOne(
      { username: username },
      { $push: { teams: { team: team._id, role: "member" } } }
    );
    await teamModel.updateOne(
      { teamCode: teamCode },
      { $push: { members: { user: user._id, role: "member" } } }
    );
    res.status(200).json({
      message: "You are part of this team now",
    });
  } catch (error) {
    res.status(500).json({
      type: "unknown",
      message: "Error while joining a team",
      error: error,
    });
  }
};

const leaveTeam = async (req, res) => {
  console.log("leaveTeam api called");
  const { username } = req.user.data;
  const { teamCode } = req.params;
  try {
    const team = await teamModel.findOne({ teamCode: teamCode });
    const user = await userModel.findOne({ username: username });
    team.members = team.members.filter((memberItem) => {
      return memberItem.user.toString() !== user._id.toString();
    });
    await team.save();
    user.teams = user.teams.filter((teamItem) => {
      return teamItem.team.toString() !== team._id.toString();
    });
    await user.save();
    res.status(200).json({
      message: "Left the team successfully",
    });
  } catch (error) {
    res.status(500).json({
      type: "unknown",
      message: "Error while leaving a team",
      error: error,
    });
  }
};

const showAllMembers = async (req, res) => {
  console.log("showAllMembers api called");
  const { teamCode } = req.params;
  try {
    const team = await teamModel
      .findOne({ teamCode: teamCode })
      .populate("members.user", "username");
    res.status(200).json({
      data: team.members,
    });
  } catch (error) {
    res.status(500).json({
      type: "unknown",
      message: "Error while showing all members",
      error: error,
    });
  }
};

const removeMember = async (req, res) => {
  console.log("removeMember api called");
  const { username } = req.user.data;
  const { teamCode, userId } = req.params;
  try {
    let isAdmin = await checkAdmin(username, teamCode);
    if (!isAdmin) {
      return res.status(401).json({
        type: "unauthorized",
        message: "You're not authorised to remove a member from a team",
      });
    }

    let team = await teamModel.findOne({ teamCode: teamCode });
    team.members = team.members.filter((memberItem) => {
      return memberItem.user.toString() !== userId.toString();
    });
    await team.save();
    let user = await userModel.findOne({ _id: userId });
    user.teams = user.teams.filter((teamItem) => {
      return teamItem.team.toString() !== team._id.toString();
    });
    await user.save();
    res.status(200).json({
      message: "User removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      type: "unknown",
      message: "Error while removing the user",
      error: error,
    });
  }
};

module.exports = {
  createTeam,
  myTeams,
  teamDetail,
  updateTeam,
  deleteTeam,
  joinTeam,
  leaveTeam,
  showAllMembers,
  removeMember,
};
