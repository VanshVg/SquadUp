import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import "./Team.css";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar";
import DashboardSidebar from "../../components/dashboardSiderbar/DashboardSidebar";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

const Team = () => {
  let userToken = Cookies.get("userToken");

  const [teamData, setTeamData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const teamId = useParams().id;

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/teams/team/${teamId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((resp) => {
        setTeamData(resp.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [teamId, userToken]);

  return (
    <>
      <Helmet>
        <title>Team Up</title>
      </Helmet>
      <div className="team-container">
        <DashboardNavbar />
        <div className="team">
          <DashboardSidebar />
          {isLoading ? (
            <div className="dashboard-loader-container">
              <ThreeDots
                type="ThreeDots"
                height={16}
                width={80}
                radius={9}
                color="#2b60de"
                ariaLabel="three-dots-loading"
                visible={true}
              />
            </div>
          ) : (
            <div className="team-content">
              <div className="team-banner">
                <img src={teamData.bannerUrl} alt="Team"></img>
                <div className="banner-name">
                  <h1 className="team-name">{teamData.name}</h1>
                </div>
                <div className="team-content-container">
                  <div className="team-code-container">
                    <p className="team-code-title">Team Code</p>
                    <h6 className="team-code">{teamData.teamCode}</h6>
                  </div>
                  <div className="team-chat">
                    <h3>Your Team content will go here...</h3>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Team;
