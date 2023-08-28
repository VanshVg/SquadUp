import React from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

const Register = () => {
  return (
    <div className="register-container">
      <form className="register-form">
        <h1 className="register-heading" align="center">
          Join Team Up
        </h1>
        <div className="input-group">
          <input type="text" name="firstName" placeholder="First Name" required />
          <input type="text" name="lastName" placeholder="Last Name" required />
        </div>

        <input type="text" name="username" placeholder="Username" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Create Password" required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" required />
        <button type="submit">Sign Up</button>
      </form>
      <p className="login-link">
        Already Have An Account? <Link to="/auth/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
