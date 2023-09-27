import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

const ForgotPasswordOtp = () => {
  const navigate = useNavigate();
  const referer = document.referrer;

  useEffect(() => {
    if (!referer.includes("http://localhost:3000/auth/forgotpassword")) {
      navigate("/");
    }
  });
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
