import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Helmet from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faTruckMedical } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import registerSchema from "../../schema/registerSchema";
import "./Auth.css";
import { ThreeDots } from "react-loader-spinner";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [registerError, setRegisterError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const data = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    verificationID: "",
  };

  const navigate = useNavigate();

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
    initialValues: data,
    validationSchema: registerSchema,
    onSubmit: (values, action) => {
      setIsLoading(faTruckMedical);
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/users/registerValidation`, values)
        .then((resp) => {
          let verificationID = uuidv4();
          if (resp.status === 200) {
            navigate(`/auth/verification/${verificationID}`, {
              state: {
                firstname: values.firstname,
                lastname: values.lastname,
                username: values.username,
                email: values.email,
                password: values.password,
                verificationID: verificationID,
              },
            });
            action.resetForm();
          }
        })
        .catch((error) => {
          const { status, data } = error.response;

          if (status === 409) {
            if (data.type === "username") {
              setRegisterError({
                type: "username",
                message: "Username has already been taken!",
              });
            }
            if (data.type === "email") {
              setRegisterError({
                type: "email",
                message: "User with this email already exists!",
              });
            }
          } else if (status === 500) {
            setRegisterError({
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
    setRegisterError({});
    handleChange(e);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <>
      <Helmet>
        <title>Team Up | Registration</title>
      </Helmet>
      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h1 className="register-heading" align="center">
            Join Team Up
          </h1>
          <div className="input-group">
            <div className="error-group">
              <div className="firstname-input">
                <input
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  required
                  value={values.firstname}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
                {errors.firstname && touched.firstname ? (
                  <p
                    style={{
                      color: "red",
                      fontSize: "14px",
                      marginTop: "1px",
                      marginBottom: "5px",
                    }}
                  >
                    {errors.firstname}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="error-group">
              <div className="lastname-input">
                <input
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  required
                  value={values.lastname}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
                {errors.lastname && touched.lastname ? (
                  <p
                    style={{
                      color: "red",
                      fontSize: "14px",
                      marginTop: "1px",
                      marginBottom: "5px",
                    }}
                  >
                    {errors.lastname}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={values.username}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />

          {errors.username && touched.username ? (
            <p
              style={{
                color: "red",
                fontSize: "14px",
                marginTop: "1px",
                marginBottom: "5px",
              }}
            >
              {errors.username}
            </p>
          ) : null}

          {registerError.type === "username" ? (
            <p
              style={{
                color: "red",
                fontSize: "14px",
                marginTop: "1px",
                marginBottom: "5px",
              }}
            >
              {registerError.message}
            </p>
          ) : null}

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={values.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />

          {errors.email && touched.email ? (
            <p
              style={{
                color: "red",
                fontSize: "14px",
                marginTop: "1px",
                marginBottom: "5px",
              }}
            >
              {errors.email}
            </p>
          ) : null}

          {registerError.type === "email" ? (
            <p
              style={{
                color: "red",
                fontSize: "14px",
                marginTop: "1px",
                marginBottom: "5px",
              }}
            >
              {registerError.message}
            </p>
          ) : null}

          <div className="password-input">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Create Password"
              required
              value={values.password}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />

            {errors.password && touched.password ? (
              <p
                style={{
                  color: "red",
                  fontSize: "14px",
                  marginTop: "1px",
                  marginBottom: "5px",
                }}
              >
                {errors.password}
              </p>
            ) : null}

            <FontAwesomeIcon
              icon={passwordVisible ? faEye : faEyeSlash}
              onClick={togglePasswordVisibility}
              className="password-icon"
            />
          </div>
          <div className="password-input">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              name="confirmpassword"
              placeholder="Confirm Password"
              required
              value={values.confirmpassword}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />

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

            <FontAwesomeIcon
              icon={confirmPasswordVisible ? faEye : faEyeSlash}
              onClick={toggleConfirmPasswordVisibility}
              className="password-icon"
            />
          </div>

          {registerError.type === "unknown" ? (
            <p
              style={{
                color: "red",
                fontSize: "14px",
                marginTop: "1px",
                marginBottom: "5px",
              }}
            >
              {registerError.message}
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
              "Sign Up"
            )}
          </button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/auth/login">Login</Link>
        </p>
      </div>
    </>
  );
};

export default Register;
