import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { setIsLoggedIn, setUserToken } from "../../../redux/actions/authActions";
import "./LogoutModal.css";

const Logoutmodal = (props) => {
  const { isOpen, onRequestClose } = props;
  const dispatch = useDispatch();

  const [logoutError, setLogoutError] = useState({});

  let userToken = Cookies.get("userToken");

  const handleLogout = () => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          withCredentials: true,
        }
      )
      .then(() => {
        dispatch(setIsLoggedIn(false));
        dispatch(setUserToken(null));
        Cookies.remove("userToken");
        Cookies.remove("isLoggedIn");
        onRequestClose();
      })
      .catch((error) => {
        const { status } = error.response;
        if (status === 500) {
          setLogoutError({
            type: "unknown",
            message: "Some unknown error occured! Please try again later.",
          });
        }
      });
  };

  return (
    <div className="modal-container">
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Logout confirmation"
        className="custom-modal"
      >
        <div className="modal-text">
          <p>Are you sure you want to logout?</p>
        </div>
        <div className="modal-buttons">
          <button className="modal-yes-button" onClick={handleLogout}>
            Yes
          </button>
          <button className="modal-no-button" onClick={onRequestClose}>
            No
          </button>
          {logoutError ? (
            <p
              style={{
                color: "red",
                fontSize: "14px",
                marginTop: "1px",
                marginBottom: "5px",
              }}
            >
              {logoutError.message}
            </p>
          ) : null}
        </div>
      </Modal>
    </div>
  );
};

export default Logoutmodal;
