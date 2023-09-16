import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Helmet from "react-helmet";
import "./EmailVerification.css";
import axios from "axios";
import { useFormik } from "formik";
import { login, setIsLoggedIn, setUserToken } from "../../redux/actions/authActions";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

const EmailVerification = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [otpError, setOtpError] = useState({});

  const { firstname, lastname, username, email, password, verificationID } = location.state;

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
    axios.post("http://localhost:4000/api/users/sendOtp", data);
  }, []);

  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: data,
    onSubmit: (values, action) => {
      axios
        .post("http://localhost:4000/api/users/register", values)
        .then((resp) => {
          console.log(resp);
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
          }
        });
    },
  });

  const handleInputChange = (e) => {
    handleChange(e);
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
              }}
            >
              {otpError.message}
            </p>
          ) : null}
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
