import { React, useState } from "react";
import Helmet from "react-helmet";
import { ThreeDots } from "react-loader-spinner";
import "./JoinTeam.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const JoinTeam = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [joinTeamError, setJoinTeamError] = useState({});

  const navigate = useNavigate();

  const data = {
    teamCode: "",
  };

  let userToken = Cookies.get("userToken");

  const handleJoinTeam = (e) => {
    setIsLoading(true);
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/teams/joinTeam`, data, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((resp) => {
        if (resp.status === 200) {
          navigate("/dashboard/home");
        }
      })
      .catch((error) => {
        const { status } = error.response;
        if (status === 404) {
          setJoinTeamError({
            type: "not_found",
            message: "Team with this team code not found",
          });
        } else if (status === 409) {
          setJoinTeamError({
            type: "conflict",
            message: "You are already part of this team",
          });
        } else if (status === 500) {
          setJoinTeamError({
            type: "unknown",
            message: "Some unknown error occured! Please try again later.",
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCodeChange = (e) => {
    data.teamCode = e.target.value;
  };

  return (
    <>
      <Helmet>
        <title>Create Team</title>
      </Helmet>
      <div className="jointeam-container">
        <form className="jointeam-form" onSubmit={handleJoinTeam}>
          <h1 className="jointeam-heading" align="center">
            Join Team
          </h1>

          <div className="code-input">
            <input
              type="text"
              name="name"
              placeholder="Enter Team Code"
              required
              onChange={handleCodeChange}
            />
            {joinTeamError ? (
              <p
                style={{
                  color: "red",
                  fontSize: "14px",
                  marginTop: "1px",
                  marginBottom: "5px",
                  marginLeft: "1px",
                }}
              >
                {joinTeamError.message}
              </p>
            ) : null}
          </div>
          <button type="submit" className="loader-button">
            {isLoading ? (
              <div className="loader-container">
                <ThreeDots
                  type="ThreeDots"
                  height={16}
                  width={80}
                  radius={9}
                  color="white"
                  ariaLabel="three-dots-loading"
                  visible={true}
                />
              </div>
            ) : (
              "Join Team"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default JoinTeam;
