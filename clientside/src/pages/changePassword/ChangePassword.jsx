import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import "./ChangePassword.css";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import changePasswordSchema from "../../schema/changePasswordSchema";

const ChangePassword = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isUserValid, setIsUserValid] = useState();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [changePasswordError, setChangePasswordError] = useState({});

  const id = useParams().id;
  const navigate = useNavigate();

  const data = {
    newpassword: "",
    confirmpassword: "",
    id: id,
  };

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/users/userValid`, data)
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
          setChangePasswordError({
            type: "unknown",
            message: "Some unknown error occured! Please try again later.",
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  });

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
    initialValues: data,
    validationSchema: changePasswordSchema,
    onSubmit: (values, action) => {
      setIsButtonLoading(true);
      axios
        .put(`${process.env.REACT_APP_BACKEND_URL}/api/users/changePassword`, values)
        .then((resp) => {
          if (resp.status === 200) {
            navigate("/auth/login");
            action.resetForm();
          }
        })
        .catch((error) => {
          const { status } = error.response;
          if (status === 500) {
            setChangePasswordError({
              type: "unknown",
              message: "Some unknown error occured! Please try again later.",
            });
          }
        })
        .finally(() => {
          setIsButtonLoading(false);
        });
    },
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };
  return (
    <div>
      <Helmet>
        <title>Team Up | ChangePassword</title>
      </Helmet>
      <div className="changepassword-container">
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
          <form className="changepassword-form" onSubmit={handleSubmit}>
            <h1 className="changepassword-heading" align="center">
              Team Up
            </h1>
            <p align="center">Please set your new password</p>
            <div className="password-input">
              <input
                type={passwordVisible ? "text" : "password"}
                name="newpassword"
                placeholder="Enter your new Password"
                required
                value={values.newpassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FontAwesomeIcon
                icon={passwordVisible ? faEye : faEyeSlash}
                onClick={togglePasswordVisibility}
                className="password-icon"
              />
              {errors.newpassword && touched.newpassword ? (
                <p
                  style={{
                    color: "red",
                    fontSize: "14px",
                    marginTop: "1px",
                    marginBottom: "5px",
                  }}
                >
                  {errors.newpassword}
                </p>
              ) : null}
            </div>
            <div className="password-input">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                name="confirmpassword"
                placeholder="Confirm new Password"
                required
                value={values.confirmpassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FontAwesomeIcon
                icon={confirmPasswordVisible ? faEye : faEyeSlash}
                onClick={toggleConfirmPasswordVisibility}
                className="password-icon"
              />
            </div>
            {errors.confirmpassword && touched.confirmpassword ? (
              <p
                style={{
                  color: "red",
                  fontSize: "14px",
                  marginTop: "1px",
                  marginBottom: "5px",
                }}
              >
                {errors.confirmpassword}
              </p>
            ) : null}
            {changePasswordError.type === "unknown" ? (
              <p
                style={{
                  color: "red",
                  fontSize: "14px",
                  marginTop: "1px",
                  marginBottom: "5px",
                }}
              >
                {changePasswordError.message}
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
          </form>
        ) : (
          <h1>You are not allowed to access this page</h1>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
