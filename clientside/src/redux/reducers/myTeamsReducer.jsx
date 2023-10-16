import { SET_MYTEAMS_DATA } from "../types";

const initialState = {
  myTeamsData: [],
};

const myTeamsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MYTEAMS_DATA:
      return {
        ...state,
        myTeamsData: action.payload,
      };
    default:
      return state;
  }
};

export default myTeamsReducer;
