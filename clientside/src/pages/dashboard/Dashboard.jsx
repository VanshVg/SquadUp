import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar";
import DashboardSidebar from "../../components/dashboardSiderbar/DashboardSidebar";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Dashboard = () => {
  const [data, setData] = useState([{}]);
  console.log(data);

  const navigate = useNavigate();

  let userToken = Cookies.get("userToken");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/teams/myTeams`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((resp) => {
        setData(resp.data.teams);
        console.log(data.length);
      });
  }, []);

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
            {data.length > 0 ? (
              <>
                {data.map((item, index) => (
                  <div className="card" key={index}>
                    <div className="upper-row">
                      <h2>{item.name}</h2>
                      <p className="admin-name">{item.admin}</p>
                    </div>
                    <div className="lower-row">
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
