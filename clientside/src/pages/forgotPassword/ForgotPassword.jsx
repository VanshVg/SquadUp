import React from "react";
import Helmet from "react-helmet";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";

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
          <p>Enter your account's email id to recieve a link to reset your password.</p>
          <div className="email-input">
            <input type="email" name="email" placeholder="Enter your email id" required />
          </div>
          {/* {otpError.type === "otp" ? (
            <p
              style={{
                color: "red",
                fontSize: "14px",
                marginTop: "1px",
                marginBottom: "5px",
              }}
            >
              {otpError.message}
            </p>
          ) : null} */}
          <button type="submit">Continue</button>
          <p className="email-link">
            Didn't Recieve an email? <Link>Send Again</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
