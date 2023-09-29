import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ForgotPassword.css";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

const ForgotPasswordOtp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUserValid, setIsUserValid] = useState();
  const id = useParams();

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/users/forgotPassword`, id)
      .then((resp) => {
        if (resp.status === 200) {
          setIsUserValid(true);
        }
      })
      .catch((error) => {
        const { status } = error.response;
        if (status === 404) {
          setIsUserValid(false);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="forgotpassword-container">
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
            <button type="submit">Continue</button>
            <p className="otp-link">
              Didn't Recieve an OTP? <Link>Send Again</Link>
            </p>
          </form>
        ) : (
          <h1>You are not allowed to access this page</h1>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordOtp;
