import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Helmet from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import loginSchema from "./../../schema/loginSchema";
import { login, setIsLoggedIn, setUserToken } from "../../redux/actions/authActions";
import "./Auth.css";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginType, setLoginType] = useState("username");

  const data = {
    username: "",
    email: "",
    password: "",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, errors, handleBlur, handleChange, handleSubmit, touched, setTouched } = useFormik(
    {
      initialValues: data,
      validationSchema: () => loginSchema(loginType),
      onSubmit: (values, action) => {
        axios.post("http://localhost:4000/api/users/login", values).then((resp) => {
          if (resp.data.isLoggedIn) {
            dispatch(login(true, resp.data.userToken));
            dispatch(setIsLoggedIn(true));
            dispatch(setUserToken(resp.data.userToken));
            Cookies.set("isLoggedIn", true, { expires: 31 });
            Cookies.set("userToken", resp.data.userToken);
          }

          if (resp.status === 200) {
            navigate("/");
            action.resetForm();
          }
        });
      },
    }
  );

  const handleInputChange = (e) => {
    handleChange(e);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLoginType = (type) => {
    setLoginType(type);
    setTouched({});

    handleChange({
      target: {
        name: "username",
        value: type === "username" ? "" : values.username,
      },
    });

    handleChange({
      target: {
        name: "email",
        value: type === "email" ? "" : values.email,
      },
    });

    handleChange({
      target: {
        name: "password",
        value: "",
      },
    });
  };

  return (
    <>
      <Helmet>
        <title>Team Up | Login</title>
      </Helmet>
      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h1 className="register-heading" align="center">
            Welcome Back!
          </h1>

          {loginType === "username" ? (
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              value={values.username}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
          ) : (
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={values.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
          )}

          {loginType === "username" && errors.username && touched.username ? (
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

          {loginType === "email" && errors.email && touched.email ? (
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
              placeholder="Enter Password"
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
          {loginType === "username" || loginType === "email" ? (
            <button type="submit">Login</button>
          ) : null}
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
