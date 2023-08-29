import React, { useState } from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./Auth.css";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginType, setLoginType] = useState("username");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLoginType = (type) => {
    setLoginType(type);
  };

  return (
    <>
      <Helmet>
        <title>Team Up | Login</title>
      </Helmet>
      <div className="register-container">
        <form className="register-form">
          <h1 className="register-heading" align="center">
            Welcome Back!
          </h1>

          {loginType === "username" ? (
            <input type="text" name="username" placeholder="Username" required />
          ) : (
            <input type="email" name="email" placeholder="Email" required />
          )}

          <div className="password-input">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              required
            />
            <FontAwesomeIcon
              icon={passwordVisible ? faEye : faEyeSlash}
              onClick={togglePasswordVisibility}
              className="password-icon"
            />
          </div>
          <button type="submit">Login</button>
          {loginType === "username" ? (
            <p className="login-link">
              or Continue with <Link onClick={() => handleLoginType("email")}>Email Id</Link>
            </p>
          ) : (
            <p className="login-link">
              or Continue with <Link onClick={() => handleLoginType("username")}>Username</Link>
            </p>
          )}
        </form>
        <p className="login-link">
          New to the Team Up? <Link to="/auth/register">Create An Account</Link>
        </p>
      </div>
    </>
  );
};

export default Login;
