import React from "react";
import Helmet from "react-helmet";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  return (
    <>
      <Helmet>
        <title>Team Up | ForgotPassword</title>
      </Helmet>
      <div className="forgotpassword-container">
        <form className="forgotpassword-form">
          <h1 className="forgotpassword-heading" align="center">
            Team Up
          </h1>
          <p>Enter the email address associated with your Team Up account.</p>
          <div className="email-input">
            <input type="email" name="email" placeholder="Enter your Email Id" required />
          </div>
          <button type="submit">Continue</button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
