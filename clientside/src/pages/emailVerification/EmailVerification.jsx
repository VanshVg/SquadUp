import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Helmet from "react-helmet";
import "./EmailVerification.css";
import axios from "axios";
import { useFormik } from "formik";
import { login, setIsLoggedIn, setUserToken } from "../../redux/actions/authActions";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { ThreeDots } from "react-loader-spinner";

const EmailVerification = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [otpError, setOtpError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { firstname, lastname, username, email, password, verificationID } = location.state || {};

  const data = {
    firstname: firstname,
    lastname: lastname,
    username: username,
    email: email,
    password: password,
    verificationID: verificationID,
    userOTP: "",
  };

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/sendOtp`, data).catch((error) => {
      const { status } = error.response;
      if (status === 500) {
        setOtpError({
          type: "unknown",
          message: "Some unknown error occured! Please try again later.",
        });
      }
    });
  }, []);

  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: data,
    onSubmit: (values, action) => {
      setIsLoading(true);
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/users/register`, values)
        .then((resp) => {
          if (resp.data.isLoggedIn) {
            dispatch(login(true, resp.data.userToken));
            dispatch(setIsLoggedIn(true));
            dispatch(setUserToken(resp.data.userToken));
            Cookies.set("isLoggedIn", true, { expires: 31 });
            Cookies.set("userToken", resp.data.userToken, { expires: 31 });
          }

          if (resp.status === 200) {
            navigate("/");
            action.resetForm();
          }
        })
        .catch((error) => {
          const { status, data } = error.response;
          if (status === 404) {
            if (data.type === "otp") {
              setOtpError({
                type: "otp",
                message: "Otp is incorrect",
              });
            }
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
    },
  });

  const handleInputChange = (e) => {
    handleChange(e);
  };

  const handleSendAgain = () => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/sendOtp`, data).catch((error) => {
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
    <>
      <Helmet>
        <title>Team Up | Verification</title>
      </Helmet>
      <div className="verification-container">
        <form className="verification-form" onSubmit={handleSubmit}>
          <h1 className="verification-heading" align="center">
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
              required
              value={values.userOTP}
              onChange={handleInputChange}
              onBlur={handleBlur}
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
          <p className="otp-link">
            Didn't Recieve an OTP? <Link onClick={handleSendAgain}>Send Again</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default EmailVerification;
