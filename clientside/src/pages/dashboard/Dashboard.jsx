import React, { useState } from "react";
import Helmet from "react-helmet";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar";
import DashboardSidebar from "../../components/dashboardSiderbar/DashboardSidebar";
import "./Dashboard.css";

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Helmet>
        <title>My Dashboard</title>
      </Helmet>
      <div className="dashboard-container">
        <DashboardNavbar toggleSidebar={toggleSidebar} />
        <div className="dashboard">
          <DashboardSidebar isSidebarOpen={isSidebarOpen} />
          <div className="dashboard-content">
            <h1>This is Dashboard</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
