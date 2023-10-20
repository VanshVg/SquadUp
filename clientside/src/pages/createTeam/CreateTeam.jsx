import { React, useState } from "react";
import "./CreateTeam.css";
import Helmet from "react-helmet";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

const CreateTeam = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const teamData = {
    name: "",
    description: "",
  };

  let userToken = Cookies.get("userToken");

  const handleCreateTeam = (e) => {
    setIsLoading(true);
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/teams/create`, teamData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((resp) => {
        navigate("/dashboard/home");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleNameChange = (e) => {
    teamData.name = e.target.value;
  };

  const handleDescriptionChange = (e) => {
    teamData.description = e.target.value;
  };

  return (
    <>
      <Helmet>
        <title>Create Team</title>
      </Helmet>
      <div className="createTeam-container">
        <form className="createTeam-form" onSubmit={handleCreateTeam}>
          <h1 className="createTeam-heading" align="center">
            Create Team
          </h1>

          <div className="name-input">
            <input
              type="text"
              name="name"
              placeholder="Enter Team name"
              required
              onChange={handleNameChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Enter description"
              required
              onChange={handleDescriptionChange}
            />
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
              "Create Team"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateTeam;
