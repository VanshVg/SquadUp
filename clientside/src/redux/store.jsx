import { createStore, combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import sidebarReducer from "./reducers/sidebarReducer";
import myTeamsReducer from "./reducers/myTeamsReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  sidebar: sidebarReducer,
  myTeams: myTeamsReducer,
});

const store = createStore(rootReducer);

export default store;
