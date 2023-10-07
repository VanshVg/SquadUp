import { SET_MYTEAMS_FALSE, SET_SIDEBAR_TRUE, TOGGLE_MYTEAMS, TOGGLE_SIDEBAR } from "../types";

const initialState = {
  isSidebarOpen: false,
  isMyTeamsOpen: false,
};

const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };
    case SET_SIDEBAR_TRUE:
      return {
        ...state,
        isSidebarOpen: true,
      };
    case TOGGLE_MYTEAMS:
      return {
        ...state,
        isMyTeamsOpen: !state.isMyTeamsOpen,
      };
    case SET_MYTEAMS_FALSE:
      return {
        ...state,
        isMyTeamsOpen: false,
      };
    default:
      return state;
  }
};

export default sidebarReducer;
