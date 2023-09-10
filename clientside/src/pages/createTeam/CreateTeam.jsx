import { React } from "react";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar";
import DashboardSidebar from "../../components/dashboardSiderbar/DashboardSidebar";
import "./CreateTeam.css";

const CreateTeam = () => {
  return (
    <div>
      <div className="createteam-container">
        <DashboardNavbar />
        <div className="createteam">
          <DashboardSidebar />
          <div className="createteam-content">
            <h1>This is Create Team page</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
