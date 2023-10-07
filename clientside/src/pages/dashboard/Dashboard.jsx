import React from "react";
import Helmet from "react-helmet";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar";
import DashboardSidebar from "../../components/dashboardSiderbar/DashboardSidebar";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCreateTeam = () => {
    navigate("/CreateTeam");
  };

  const handleJoinTeam = () => {
    navigate("/JoinTeam");
  };

  return (
    <>
      <Helmet>
        <title>My Dashboard</title>
      </Helmet>
      <div className="dashboard-container">
        <DashboardNavbar />
        <div className="dashboard">
          <DashboardSidebar />
          <div className="dashboard-content">
            <div className="dashboard-image">
              <img src="/images/addTeam2.jpg" alt="Create Team"></img>
            </div>
            <p className="dashboard-text">
              You are not part of any team currently so Join or Create a team
            </p>
            <div className="dashboard-buttons">
              <button className="create-team-button" onClick={handleCreateTeam}>
                Create a Team
              </button>
              <button className="join-team-button" onClick={handleJoinTeam}>
                Join a Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
