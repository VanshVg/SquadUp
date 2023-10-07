import { SET_MYTEAMS_FALSE, SET_SIDEBAR_TRUE, TOGGLE_MYTEAMS, TOGGLE_SIDEBAR } from "../types";

export const toggleSidebar = () => {
  return {
    type: TOGGLE_SIDEBAR,
  };
};

export const setIsSideBarOpen = () => {
  return {
    type: SET_SIDEBAR_TRUE,
  };
};

export const toggleMyTeams = () => {
  return {
    type: TOGGLE_MYTEAMS,
  };
};

export const setIsMyTeamsOpen = () => {
  return {
    type: SET_MYTEAMS_FALSE,
  };
};
