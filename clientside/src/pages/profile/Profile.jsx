import React, { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";
import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";
import VerifyPasswordModal from "../../components/modals/verifyPasswordModal/VerifyPassword";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});

  const [isVerifyPasswordOpen, setIsVerifyPasswordOpen] = useState(false);

  let userToken = Cookies.get("userToken");

  const handleChangePassword = () => {
    setIsVerifyPasswordOpen(true);
  };

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
    <div className="userprofile-page">
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
          <div className="userprofile-image">
            <img
              src="/images/profilePage.jpg"
              width="800px"
              height="800px"
              alt="Profile Page"
            ></img>
          </div>
          <div className="userprofile-content">
            <h1>Profile Page</h1>
            <p className="userprofile-text">Username</p>
            <input type="text" placeholder={userData.Username} disabled></input>
            <p className="userprofile-text">Email Address</p>
            <input type="text" placeholder={userData.Email} disabled></input>
            <div className="userprofile-buttons">
              <button className="update-userprofile-button">Update Profile</button>
              <button className="change-password-button" onClick={handleChangePassword}>
                Change Password
              </button>
            </div>
          </div>
          <VerifyPasswordModal
            isOpen={isVerifyPasswordOpen}
            onRequestClose={() => setIsVerifyPasswordOpen(false)}
            email={userData.Email}
          />
        </>
      )}
    </div>
  );
};

export default Profile;
