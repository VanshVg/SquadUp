import React, { useState } from "react";
import Modal from "react-modal";
import "./VerifyPassword.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Helmet from "react-helmet";

const VerifyPasswordModal = (props) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [verifyPasswordError, setVerifyPasswordError] = useState({});
  const { isOpen, onRequestClose, email } = props;

  const navigate = useNavigate();

  const data = {
    oldPassword: "",
  };

  let resetPasswordToken = uuidv4();

  const resetData = {
    email: email,
    resetPasswordToken: resetPasswordToken,
  };

  let userToken = Cookies.get("userToken");

  const handleVerifyButton = () => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/users/verifyPassword`, data, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((resp) => {
        if (resp.status === 200) {
          axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/api/users/setResetPasswordToken`, resetData)
            .then((resp) => {
              if (resp.status === 200) {
                navigate(`/auth/changepassword/${resetPasswordToken}`);
              }
            });
        }
      })
      .catch((error) => {
        const { status } = error.response;
        if (status === 401) {
          setVerifyPasswordError({
            type: "incorrect",
            message: "Entered password is incorrect",
          });
        } else if (status === 500) {
          setVerifyPasswordError({
            type: "incorrect",
            message: "Some unknown error occured! Please try again later.",
          });
        }
      });
  };

  const handleChange = (e) => {
    data.oldPassword = e.target.value;
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <>
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <div className="modal-container">
        <Modal
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          contentLabel="Verify Password"
          className="custom-verifymodal"
        >
          <div className="verifypassword-modal-text">
            <p>Enter your current password</p>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter Password"
              onChange={handleChange}
            ></input>
          </div>
          <FontAwesomeIcon
            icon={passwordVisible ? faEye : faEyeSlash}
            onClick={togglePasswordVisibility}
            className="verifypassword-icon"
          />
          {verifyPasswordError ? (
            <p
              style={{
                color: "red",
                fontSize: "17px",
                marginTop: "1px",
                marginBottom: "5px",
                marginLeft: "55px",
              }}
            >
              {verifyPasswordError.message}
            </p>
          ) : null}
          <p className="modal-forgotpassword-link">
            <Link to="/auth/forgotpassword">Forgot Password ?</Link>
          </p>

          <div className="verifypassword-buttons">
            <button className="verifypassword-verify-button" onClick={handleVerifyButton}>
              Verify
            </button>
            <button className="verifypassword-cancel-button" onClick={onRequestClose}>
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default VerifyPasswordModal;
