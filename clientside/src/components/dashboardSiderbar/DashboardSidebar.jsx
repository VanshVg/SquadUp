import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import AddIcon from "@mui/icons-material/Add";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Tooltip from "@mui/material/Tooltip";
import "./DashboardSidebar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const DashboardSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);

  const handleHome = () => {
    navigate("/dashboard/home");
  };

  const handleMyTeams = () => {
    navigate("/dashboard/MyTeams");
  };

  const handleCreateTeam = () => {
    navigate("/dashboard/CreateTeam");
  };

  const handleJoinTeam = () => {
    navigate("/dashboard/JoinTeam");
  };

  return (
    <div>
      {isSidebarOpen ? (
        <div className="dashboard-sidebar" style={{ width: "180px" }}>
          <div
            className={`${
              location.pathname === "/dashboard/home" ? "sidebar-item-active" : "sidebar-item"
            }`}
            onClick={handleHome}
          >
            <div className="sidebar-item-icon">
              <HomeIcon />
            </div>
            <div className="sidebar-item-text">Home</div>
          </div>
          <div
            className={`${
              location.pathname === "/dashboard/MyTeams" ? "sidebar-item-active" : "sidebar-item"
            }`}
            onClick={handleMyTeams}
          >
            <div className="sidebar-item-icon">
              <GroupsIcon />
            </div>
            <div className="sidebar-item-text">My Teams</div>
          </div>
          <div
            className={`${
              location.pathname === "/dashboard/CreateTeam" ? "sidebar-item-active" : "sidebar-item"
            }`}
            onClick={handleCreateTeam}
          >
            <div className="sidebar-item-icon">
              <AddIcon />
            </div>
            <div className="sidebar-item-text">Create a team</div>
          </div>
          <div
            className={`${
              location.pathname === "/dashboard/JoinTeam" ? "sidebar-item-active" : "sidebar-item"
            }`}
            onClick={handleJoinTeam}
          >
            <div className="sidebar-item-icon">
              <GroupAddIcon />
            </div>
            <div className="sidebar-item-text">Join a team</div>
          </div>
        </div>
      ) : (
        <div className="dashboard-sidebar">
          <Tooltip title="Dashboard Home">
            <div
              className={`${
                location.pathname === "/dashboard/home" ? "sidebar-item-active" : "sidebar-item"
              }`}
              onClick={handleHome}
            >
              <div className="sidebar-item-icon">
                <HomeIcon />
              </div>
            </div>
          </Tooltip>
          <Tooltip title="My Teams">
            <div
              className={`${
                location.pathname === "/dashboard/MyTeams" ? "sidebar-item-active" : "sidebar-item"
              }`}
              onClick={handleMyTeams}
            >
              <div className="sidebar-item-icon">
                <GroupsIcon />
              </div>
            </div>
          </Tooltip>
          <Tooltip title="Create a team">
            <div
              className={`${
                location.pathname === "/dashboard/CreateTeam"
                  ? "sidebar-item-active"
                  : "sidebar-item"
              }`}
              onClick={handleCreateTeam}
            >
              <div className="sidebar-item-icon">
                <AddIcon />
              </div>
            </div>
          </Tooltip>
          <Tooltip title="Join a team">
            <div
              className={`${
                location.pathname === "/dashboard/JoinTeam" ? "sidebar-item-active" : "sidebar-item"
              }`}
              onClick={handleJoinTeam}
            >
              <div className="sidebar-item-icon">
                <GroupAddIcon />
              </div>
            </div>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default DashboardSidebar;
