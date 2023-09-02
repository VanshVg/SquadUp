import React from "react";
import Helmet from "react-helmet";
import Navbar from "./../components/navbar/Navbar";
import GitHubIcon from "@mui/icons-material/GitHub";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Team Up | Home</title>
      </Helmet>
      <Navbar />
      <div className="homepage-container">
        <div className="slogan">
          <div className="slogan-line">Collaborate.</div>
          <div className="slogan-line">Achieve.</div>
          <div className="slogan-line">Succeed.</div>
        </div>
        <div className="description">
          Welcome to Team Up, streamline your task management with Team Up, where seamless
          collaboration ensures your team's success.
        </div>
      </div>
      <div className="home-buttons">
        <Link
          to="https://github.com/VanshVg/TeamUp"
          target="_blank"
          rel="noopener noreferrer"
          className="custom-link"
        >
          <button className="github-button">
            <div className="github-button-content">
              <GitHubIcon />
              <span>Team Up Github</span>
            </div>
          </button>
        </Link>
      </div>
    </>
  );
};

export default Home;
