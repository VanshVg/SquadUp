import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
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

  const handleExit = () => {
    navigate("/");
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
          <div className="sidebar-item" onClick={handleExit}>
            <div className="sidebar-item-icon">
              <ExitToAppIcon />
            </div>
            <div className="sidebar-item-text">Exit Dashboard</div>
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
          <Tooltip title="Exit Dashboard">
            <div className="sidebar-item" onClick={handleExit}>
              <div className="sidebar-item-icon">
                <ExitToAppIcon />
              </div>
            </div>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default DashboardSidebar;
