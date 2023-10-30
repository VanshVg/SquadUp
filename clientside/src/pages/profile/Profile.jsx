import React, { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";
import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
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
        console.log(userData);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="profile-page">
      {isLoading ? (
        <>
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
        </>
      ) : (
        <>
          <div className="profile-image">
            <img
              src="/images/profilePage.jpg"
              width="800px"
              height="800px"
              alt="Profile Page"
            ></img>
          </div>
          <div className="profile-content">
            <h1>Profile Page</h1>
            <p className="profile-text">Username</p>
            <input type="text" placeholder={userData.Username} disabled></input>
            <p className="profile-text">Email Address</p>
            <input type="text" placeholder={userData.Email} disabled></input>
            <div className="profile-buttons">
              <button className="update-profile-button">Update Profile</button>
              <button className="change-password-button">Change Password</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
