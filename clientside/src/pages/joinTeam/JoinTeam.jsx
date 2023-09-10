import { React } from "react";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar";
import DashboardSidebar from "../../components/dashboardSiderbar/DashboardSidebar";
import "./JoinTeam.css";

const JoinTeam = () => {
  return (
    <div>
      <div className="jointeam-container">
        <DashboardNavbar />
        <div className="jointeam">
          <DashboardSidebar />
          <div className="jointeam-content">
            <h1>This is Join Team page</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinTeam;
