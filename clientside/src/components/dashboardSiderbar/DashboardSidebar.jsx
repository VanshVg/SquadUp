import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import AddIcon from "@mui/icons-material/Add";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import "./DashboardSidebar.css";

const DashboardSidebar = (props) => {
  const { isSidebarOpen } = props;

  return (
    <div>
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
  );
};

export default DashboardSidebar;
