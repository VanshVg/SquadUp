import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import "./UpdateProfile.css";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, setIsLoggedIn, setUserToken } from "../../redux/actions/authActions";

const UpdateProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFieldLoading, setIsFieldLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [updateProfileError, setUpdateProfileError] = useState({});

  let userToken = Cookies.get("userToken");

  const data = {
    newUserName: userData.Username,
    newEmail: userData.Email,
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
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

  const handleUpdateProfile = (e) => {
    setIsFieldLoading(true);
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/api/users/updateUsername`, data, {
        withCredentials: true,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((resp) => {
        if (resp.status === 200) {
          dispatch(login(true, resp.data.userToken));
          dispatch(setIsLoggedIn(true));
          dispatch(setUserToken(resp.data.userToken));
          Cookies.set("isLoggedIn", true, { expires: 31, secure: false });
          Cookies.set("userToken", resp.data.userToken, { expires: 31, secure: false });
          navigate("/profile");
        }
      })
      .catch((error) => {
        const { status, data } = error.response;
        if (status === 409) {
          setUpdateProfileError({
            type: "username",
            message: "Username has already been taken",
          });
        } else if (status === 400) {
          setUpdateProfileError({
            type: "username",
            message: "Please choose different username from current username",
          });
        } else {
          setUpdateProfileError({
            type: "unknown",
            message: "Some unknown error occured! Please try again later.",
          });
        }
      })
      .finally(() => {
        setIsFieldLoading(false);
      });
  };

  const handleUsernameChange = (e) => {
    data.newUserName = e.target.value;
  };

  return (
    <>
      <Helmet>
        <title>Update Profile</title>
      </Helmet>
      <div className="updateprofile-container">
        {isLoading ? (
          <div className="loader-container">
            <ThreeDots
              type="ThreeDots"
              height={16}
              width={80}
              radius={9}
              color="blue"
              ariaLabel="three-dots-loading"
              visible={true}
            />
          </div>
        ) : (
          <form className="updateprofile-form">
            <h1 className="updateprofile-heading" align="center">
              Update Username
            </h1>

            <div className="username-input">
              <input
                type="text"
                name="username"
                defaultValue={userData.Username}
                onChange={handleUsernameChange}
                required
              />
              {updateProfileError.type === "username" ? (
                <p
                  style={{
                    color: "red",
                    fontSize: "14px",
                    marginTop: "1px",
                    marginBottom: "5px",
                    marginLeft: "1px",
                  }}
                >
                  {updateProfileError.message}
                </p>
              ) : null}
            </div>

            <button type="submit" className="loader-button" onClick={handleUpdateProfile}>
              {isFieldLoading ? (
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
                "Update Username"
              )}
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default UpdateProfile;
