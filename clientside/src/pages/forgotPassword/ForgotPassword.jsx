import React, { useState } from "react";
import Helmet from "react-helmet";
import "./ForgotPassword.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { ThreeDots } from "react-loader-spinner";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  let resetPasswordToken = uuidv4();
  const data = {
    email: "",
    resetPasswordToken: resetPasswordToken,
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (!data.email) {
      setEmailError({
        type: "email",
        message: "Please enter valid email id",
      });
    } else {
      setIsLoading(true);
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/users/setResetPasswordToken`, data)
        .then((resp) => {
          if (resp.status === 200) {
            navigate(`/auth/forgotpassword/otp/${resetPasswordToken}`);
          }
        })
        .catch((error) => {
          const { status, data } = error.response;
          if (status === 404) {
            if (data.type === "not_found") {
              setEmailError({
                type: "not_found",
                message: "User not found",
              });
            }
          } else if (status === 500) {
            setEmailError({
              type: "unknown",
              message: "Some unknown error occured! Please try again later.",
            });
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleChange = (e) => {
    data.email = e.target.value;
  };

  return (
    <>
      <Helmet>
        <title>Team Up | ForgotPassword</title>
      </Helmet>
      <div className="forgotpassword-container">
        <form className="forgotpassword-form" onSubmit={handleContinue}>
          <h1 className="forgotpassword-heading" align="center">
            Team Up
          </h1>
          <p>Enter the email address associated with your Team Up account.</p>
          <div className="email-input">
            <input
              type="email"
              name="email"
              placeholder="Enter your Email Id"
              onChange={handleChange}
              required
            />
            {emailError.type === "not_found" ? (
              <p
                style={{
                  color: "red",
                  fontSize: "14px",
                  marginTop: "1px",
                  marginBottom: "5px",
                  marginLeft: "1px",
                }}
              >
                {emailError.message}
              </p>
            ) : null}
            {emailError.type === "unknown" ? (
              <p
                style={{
                  color: "red",
                  fontSize: "14px",
                  marginTop: "1px",
                  marginBottom: "5px",
                  marginLeft: "1px",
                }}
              >
                {emailError.message}
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
              "Continue"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
