import { React } from "react";
import "./CreateTeam.css";
import Helmet from "react-helmet";

const CreateTeam = () => {
  return (
    <>
      <Helmet>
        <title>Create Team</title>
      </Helmet>
      <div className="createTeam-container">
        <form className="createTeam-form">
          <h1 className="createTeam-heading" align="center">
            Create Team
          </h1>

          <div className="name-input">
            <input type="text" name="name" placeholder="Enter Team name" required />
            <input
              type="text"
              name="description"
              placeholder="Enter description (Optional)"
              required
            />
          </div>
          <button type="submit" className="loader-button">
            Create Team
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateTeam;
