import { React } from "react";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar";
import DashboardSidebar from "../../components/dashboardSiderbar/DashboardSidebar";
import "./MyTeams.css";

const MyTeams = () => {
  return (
    <div>
      <div className="myteams-container">
        <DashboardNavbar />
        <div className="myteams">
          <DashboardSidebar />
          <div className="myteams-content">
            <h1>This is My Teams page</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTeams;
