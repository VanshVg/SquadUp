import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import "./DashboardNavbar.css";

const DashboardNavbar = (props) => {
  const { toggleSidebar } = props;
  return (
    <div>
      <div className="dashboard-navbar">
        <div className="dashboard-navbar-left">
          <div className="sidebar-icon" onClick={toggleSidebar}>
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
    </div>
  );
};

export default DashboardNavbar;
