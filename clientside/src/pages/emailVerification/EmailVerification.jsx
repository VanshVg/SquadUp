import React from "react";
import { Link, useLocation } from "react-router-dom";
import Helmet from "react-helmet";
import "./EmailVerification.css";

const EmailVerification = () => {
  const location = useLocation();
  const { firstname, lastname, username, email, password } = location.state;

  const data = {
    firstname: firstname,
    lastname: lastname,
    username: username,
    email: email,
    password: password,
    userOTP: "",
  };

  console.log(data);

  return (
    <>
      <Helmet>
        <title>Team Up | Verification</title>
      </Helmet>
      <div className="verification-container">
        <form className="verification-form">
          <h1 className="verification-heading" align="center">
            Team Up
          </h1>
          <p>
            One Time Password (OTP) has been sent your email address. Please open your email and
            enter an OTP.
          </p>
          <div className="otp-input">
            <input type="text" name="userOTP" placeholder="Enter OTP" required />
          </div>
          <button type="submit">Continue</button>
          <p className="otp-link">
            Didn't Recieve an OTP? <Link>Send Again</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default EmailVerification;
