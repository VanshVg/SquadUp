import { SET_MYTEAMS_DATA } from "../types";

export const setMyTeamsData = (myTeamsData) => {
  return {
    type: SET_MYTEAMS_DATA,
    payload: myTeamsData,
  };
};
