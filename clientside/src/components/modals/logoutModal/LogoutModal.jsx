import React from "react";
import Modal from "react-modal";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { setIsLoggedIn, setUserToken } from "../../../redux/actions/authActions";
import "./LogoutModal.css";

const Logoutmodal = (props) => {
  const { isOpen, onRequestClose } = props;
  const dispatch = useDispatch();

  const handleLogout = () => {
    axios.post("http://localhost:4000/api/users/logout", {}, { withCredentials: true }).then(() => {
      dispatch(setIsLoggedIn(false));
      dispatch(setUserToken(null));
      Cookies.remove("userToken");
      Cookies.remove("isLoggedIn");
      onRequestClose();
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
        </div>
      </Modal>
    </div>
  );
};

export default Logoutmodal;
