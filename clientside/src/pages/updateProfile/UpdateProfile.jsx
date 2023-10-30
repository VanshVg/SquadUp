import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import "./UpdateProfile.css";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import Cookies from "js-cookie";

const UpdateProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({});

  let userToken = Cookies.get("userToken");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((resp) => {
        setUserData(resp.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Update Profile</title>
      </Helmet>
      <div className="updateprofile-container">
        <form className="updateprofile-form">
          <h1 className="updateprofile-heading" align="center">
            Update Profile
          </h1>

          <div className="username-input">
            <input type="text" name="username" defaultValue={userData.Username} required />
          </div>
          <div className="updateprofile-email-input">
            <input type="text" name="email" defaultValue={userData.Email} required />
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
              "Update Profile"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProfile;
