import React from "react";
import { Link, useParams } from "react-router-dom";
import "./ForgotPassword.css";

const ForgotPasswordOtp = () => {
  return (
    <div>
      <div className="forgotpassword-container">
        <form className="forgotpassword-form">
          <h1 className="forgotpassword-heading" align="center">
            Team Up
          </h1>
          <p>
            One Time Password (OTP) has been sent your email address. Please open your email and
            enter an OTP.
          </p>
          <div className="otp-input">
            <input type="text" name="userOTP" placeholder="Enter OTP" required />
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
          <p className="otp-link">
            Didn't Recieve an OTP? <Link>Send Again</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordOtp;
