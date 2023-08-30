import React, { useState } from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import registerSchema from "./../../schema/registerSchema";
import "./Auth.css";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const data = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  };

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
    initialValues: data,
    validationSchema: registerSchema,
  });

  const handleInputChange = (e) => {
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
                  style={{ color: "red", fontSize: "14px", marginTop: "1px", marginBottom: "5px" }}
                >
                  {errors.firstname}
                </p>
              ) : null}
            </div>
            <div className="error-group">
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
          <button type="submit">Sign Up</button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/auth/login">Login</Link>
        </p>
      </div>
    </>
  );
};

export default Register;
