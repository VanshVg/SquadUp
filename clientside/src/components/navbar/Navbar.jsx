import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="team-up-logo">Team Up</div>
      </div>
      <div className="navbar-middle">
        <ul className="navbar-options">
          <li className="navbar-option active">Home</li>
          <li className="navbar-option">Dashboard</li>
          <li className="navbar-option">About Us</li>
        </ul>
      </div>
      <div className="navbar-right">
        <button className="sign-in-button">Sign In</button>
        <button className="sign-up-button">Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
