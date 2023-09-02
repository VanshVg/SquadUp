import React from "react";
import "./Navbar.css";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignInButton = () => {
    navigate("/auth/login");
  };

  const handleSignUpButton = () => {
    navigate("/auth/register");
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleAboutUs = () => {
    navigate("/aboutUs");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="team-up-logo" onClick={handleHome}>
          Team Up
        </div>
      </div>
      <div className="navbar-middle">
        <ul className="navbar-options">
          <li
            className={`navbar-option ${location.pathname === "/" ? "active" : ""}`}
            onClick={handleHome}
          >
            Home
          </li>
          <li
            className={`navbar-option ${location.pathname === "/dashboard" ? "active" : ""}`}
            onClick={handleDashboard}
          >
            Dashboard
          </li>
          <li
            className={`navbar-option ${location.pathname === "/aboutUs" ? "active" : ""}`}
            onClick={handleAboutUs}
          >
            About Us
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <button className="sign-up-button" onClick={handleSignUpButton}>
          Sign Up
        </button>
        <button className="sign-in-button" onClick={handleSignInButton}>
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
