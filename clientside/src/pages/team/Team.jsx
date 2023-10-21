import React from "react";
import Helmet from "react-helmet";
import "./Team.css";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar";
import DashboardSidebar from "../../components/dashboardSiderbar/DashboardSidebar";

const Team = () => {
  return (
    <>
      <Helmet>
        <title>Team Up</title>
      </Helmet>
      <div className="team-container">
        <DashboardNavbar />
        <div className="team">
          <DashboardSidebar />
        </div>
      </div>
    </>
  );
};

export default Team;
