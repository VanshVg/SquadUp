import React from "react";
import "./Home.css";
import Navbar from "./../components/navbar/Navbar";
import GitHubIcon from "@mui/icons-material/GitHub";

const Home = () => {
  return (
    <>
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
        <button className="github-button">
          <div className="github-button-content">
            <GitHubIcon />
            <span>Team Up Github</span>
          </div>
        </button>
      </div>
    </>
  );
};

export default Home;
