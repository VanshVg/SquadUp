import React, { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import "./ChangePassword.css";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUserValid, setIsUserValid] = useState(true);
  const [changePasswordError, setChangePasswordError] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };
  return (
    <div>
      <Helmet>
        <title>Team Up | ChangePassword</title>
      </Helmet>
      <div className="changepassword-container">
        {isLoading ? (
          <>
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#2b60de"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </>
        ) : isUserValid ? (
          <form className="changepassword-form">
            <h1 className="changepassword-heading" align="center">
              Team Up
            </h1>
            <p align="center">Please set your new password</p>
            <div className="password-input">
              <input
                type={passwordVisible ? "text" : "password"}
                name="newpassword"
                placeholder="Enter your new Password"
                required
              />
              <FontAwesomeIcon
                icon={passwordVisible ? faEye : faEyeSlash}
                onClick={togglePasswordVisibility}
                className="password-icon"
              />
            </div>
            <div className="password-input">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                name="confirmpassword"
                placeholder="Confirm new Password"
                required
              />
              <FontAwesomeIcon
                icon={confirmPasswordVisible ? faEye : faEyeSlash}
                onClick={toggleConfirmPasswordVisibility}
                className="password-icon"
              />
            </div>
            {changePasswordError ? (
              <p
                style={{
                  color: "red",
                  fontSize: "14px",
                  marginTop: "1px",
                  marginBottom: "5px",
                }}
              >
                {changePasswordError.message}
              </p>
            ) : null}
            <button type="submit">Continue</button>
          </form>
        ) : (
          <h1>You are not allowed to access this page</h1>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
