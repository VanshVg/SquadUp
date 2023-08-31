import { SET_IS_LOGGED_IN, LOGIN, SET_USER_TOKEN } from "../types";

export const login = (isLoggedIn, userToken) => {
  return {
    type: LOGIN,
    payload: { isLoggedIn, userToken },
  };
};

export const setIsLoggedIn = (isLoggedIn) => {
  return {
    type: SET_IS_LOGGED_IN,
    payload: isLoggedIn,
  };
};

export const setUserToken = (userToken) => {
  return {
    type: SET_USER_TOKEN,
    payload: userToken,
  };
};
