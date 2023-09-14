import React, { useState } from "react";
import "./Navbar.css";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Logoutmodal from "../modals/logoutModal/LogoutModal";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  let isLoggedIn = Cookies.get("isLoggedIn");

  const handleSignInButton = () => {
    navigate("/auth/login");
  };

  const handleSignUpButton = () => {
    navigate("/auth/register");
  };

  const handleDashboard = () => {
    navigate("/dashboard/home");
  };

  const handleLogout = () => {
    setIsLogoutOpen(true);
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
            className={`navbar-option ${location.pathname === "/aboutUs" ? "active" : ""}`}
            onClick={handleAboutUs}
          >
            About Us
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        {isLoggedIn === "true" ? (
          <>
            <button className="dashboard-button" onClick={handleDashboard}>
              My Dashboard
            </button>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="sign-up-button" onClick={handleSignUpButton}>
              Sign Up
            </button>
            <button className="sign-in-button" onClick={handleSignInButton}>
              Sign In
            </button>
          </>
        )}
      </div>
      <Logoutmodal isOpen={isLogoutOpen} onRequestClose={() => setIsLogoutOpen(false)} />
    </nav>
  );
};

export default Navbar;
