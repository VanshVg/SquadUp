import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./ForgotPassword.css";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

const ForgotPasswordOtp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isUserValid, setIsUserValid] = useState();
  const id = useParams().id;
  const navigate = useNavigate();
  const [otpError, setOtpError] = useState({});

  const data = {
    userOtp: "",
    id: id,
  };

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/users/forgotPassword`, data)
      .then((resp) => {
        if (resp.status === 200) {
          setIsUserValid(true);
        }
      })
      .catch((error) => {
        const { status } = error.response;
        if (status === 404) {
          setIsUserValid(false);
        } else if (status === 500) {
          setOtpError({
            type: "unknown",
            message: "Some unknown error occured! Please try again later.",
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    data.userOtp = e.target.value;
  };

  const handleOtp = (e) => {
    e.preventDefault();
    setIsButtonLoading(true);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/users/verifyForgotPasswordOtp`, data)
      .then((resp) => {
        if (resp.status === 200) {
          navigate(`/auth/changepassword/${id}`);
        }
      })
      .catch((error) => {
        const { status } = error.response;
        if (status === 404) {
          setOtpError({
            type: "otp",
            message: "Otp is incorrect",
          });
        } else if (status === 500) {
          setOtpError({
            type: "unknown",
            message: "Some unknown error occured! Please try again later.",
          });
        }
      })
      .finally(() => {
        setIsButtonLoading(false);
      });
  };

  const handleSendAgain = () => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/users/forgotPassword`, data)
      .catch((error) => {
        const { status } = error.response;
        if (status === 500) {
          setOtpError({
            type: "unknown",
            message: "Some unknown error occured! Please try again later.",
          });
        }
      });
  };

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
          <form className="forgotpassword-form" onSubmit={handleOtp}>
            <h1 className="forgotpassword-heading" align="center">
              Team Up
            </h1>
            <p>
              One Time Password (OTP) has been sent your email address. Please open your email and
              enter an OTP.
            </p>
            <div className="otp-input">
              <input
                type="text"
                name="userOTP"
                placeholder="Enter OTP"
                onChange={handleChange}
                required
              />
            </div>
            {otpError.type === "otp" ? (
              <p
                style={{
                  color: "red",
                  fontSize: "14px",
                  marginTop: "1px",
                  marginBottom: "5px",
                  marginLeft: "1px",
                }}
              >
                {otpError.message}
              </p>
            ) : null}
            {otpError.type === "unknown" ? (
              <p
                style={{
                  color: "red",
                  fontSize: "14px",
                  marginTop: "1px",
                  marginBottom: "5px",
                  marginLeft: "1px",
                }}
              >
                {otpError.message}
              </p>
            ) : null}
            <button type="submit" className="loader-button">
              {isButtonLoading ? (
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
            <p className="otp-link">
              Didn't Recieve an OTP? <Link onClick={handleSendAgain}>Send Again</Link>
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
