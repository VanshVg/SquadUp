import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import "./DashboardNavbar.css";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../redux/actions/sidebarActions";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const DashboardNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleHome = () => {
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleCreateTeam = () => {
    navigate("/createTeam");
  };

  const handleJoinTeam = () => {
    navigate("/joinTeam");
  };

  return (
    <div>
      <div className="dashboard-navbar">
        <div className="dashboard-navbar-left">
          <div className="sidebar-icon" onClick={() => dispatch(toggleSidebar())}>
            <DensitySmallIcon />
          </div>
        </div>
        <div className="dashboard-navbar-middle">
          <div className="dashboard-team-up-logo" onClick={handleHome}>
            Team Up
          </div>
        </div>
        <div className="dashboard-navbar-right ">
          <div className="add-icon">
            <Tooltip title="Add Team">
              <AddIcon onClick={handleOpenMenu} />
            </Tooltip>
            <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleCloseMenu}>
              <div className="dropdown">
                <List>
                  <div className="dropdown-text">
                    <ListItem onClick={handleCreateTeam}>
                      <ListItemText primary="Create Team" />
                    </ListItem>
                  </div>
                  <div className="dropdown-text">
                    <ListItem onClick={handleJoinTeam}>
                      <ListItemText primary="Join Team" />
                    </ListItem>
                  </div>
                </List>
              </div>
            </Popover>
          </div>
          <div className="profile" onClick={handleProfile}>
            <div className="profile-icon">
              <AccountCircleIcon />
            </div>
            <div className="profile-text">Profile</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
