import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import AddIcon from "@mui/icons-material/Add";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import "./Dashboard.css";

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="dashboard-container">
        <div className="dashboard-navbar">
          <div className="dashboard-navbar-left" onClick={toggleSidebar}>
            <div className="sidebar-icon">
              <DensitySmallIcon />
            </div>
          </div>
          <div className="dashboard-navbar-middle">
            <div className="team-up-logo">Team Up</div>
          </div>
          <div className="dashboard-navbar-right">
            <div className="profile-icon">
              <AccountCircleIcon />
            </div>
            <div className="profile-text">Profile</div>
          </div>
        </div>
        {isSidebarOpen ? (
          <div className="dashboard-sidebar" style={{ width: "180px" }}>
            <div className="sidebar-item">
              <div className="sidebar-item-icon">
                <HomeIcon />
              </div>
              <div className="sidebar-item-text">Home</div>
            </div>
            <div className="sidebar-item">
              <div className="sidebar-item-icon">
                <GroupsIcon />
              </div>
              <div className="sidebar-item-text">My Teams</div>
            </div>
            <div className="sidebar-item">
              <div className="sidebar-item-icon">
                <AddIcon />
              </div>
              <div className="sidebar-item-text">Create a team</div>
            </div>
            <div className="sidebar-item">
              <div className="sidebar-item-icon">
                <GroupAddIcon />
              </div>
              <div className="sidebar-item-text">Join a team</div>
            </div>
          </div>
        ) : (
          <div className="dashboard-sidebar">
            <div className="sidebar-item">
              <div className="sidebar-item-icon">
                <HomeIcon />
              </div>
            </div>
            <div className="sidebar-item">
              <div className="sidebar-item-icon">
                <GroupsIcon />
              </div>
            </div>
            <div className="sidebar-item">
              <div className="sidebar-item-icon">
                <AddIcon />
              </div>
            </div>
            <div className="sidebar-item">
              <div className="sidebar-item-icon">
                <GroupAddIcon />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
