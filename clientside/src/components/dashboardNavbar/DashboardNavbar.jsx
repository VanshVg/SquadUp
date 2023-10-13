import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import "./DashboardNavbar.css";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../redux/actions/sidebarActions";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";

const DashboardNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/profile");
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
              <AddIcon />
            </Tooltip>
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
