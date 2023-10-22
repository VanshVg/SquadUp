import React, { useEffect } from "react";
import Helmet from "react-helmet";
import "./Team.css";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar";
import DashboardSidebar from "../../components/dashboardSiderbar/DashboardSidebar";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

const Team = () => {
  let userToken = Cookies.get("userToken");

  const teamId = useParams().id;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/teams/team/${teamId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((resp) => {
        console.log(resp);
      });
  });

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
