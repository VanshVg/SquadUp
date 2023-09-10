import { SET_IS_LOGGED_IN, LOGIN, SET_USER_TOKEN } from "../types";

const initialState = {
  isLoggedIn: false,
  userToken: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        userToken: action.payload.userToken,
      };

    case SET_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload,
      };

    case SET_USER_TOKEN:
      return {
        ...state,
        userToken: action.payload,
      };
    default:
      return state; 
  }
};

export default authReducer;
