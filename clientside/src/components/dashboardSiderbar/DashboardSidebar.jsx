import React, { useEffect } from "react";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Tooltip from "@mui/material/Tooltip";
import "./DashboardSidebar.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsMyTeamsOpen,
  setIsSideBarOpen,
  toggleMyTeams,
} from "../../redux/actions/sidebarActions";
import Avatar from "@mui/material/Avatar";

const DashboardSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = useParams().id;

  const isMyTeamsOpen = useSelector((state) => state.sidebar.isMyTeamsOpen);
  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);
  const myTeamsData = useSelector((state) => state.myTeams.myTeamsData);

  useEffect(() => {
    if (!isSidebarOpen) {
      dispatch(setIsMyTeamsOpen());
    }
  }, [isSidebarOpen]);

  const handleHome = () => {
    navigate("/dashboard/home");
  };

  const handleExit = () => {
    navigate("/");
  };

  const handleMyTeams = () => {
    dispatch(toggleMyTeams());
    dispatch(setIsSideBarOpen());
  };

  const handleTeam = (id) => {
    navigate(`/team/${id}`);
  };

  return (
    <div>
      {isSidebarOpen ? (
        <div
          className="dashboard-sidebar"
          style={
            myTeamsData.length > 6
              ? { height: "100%", width: "280px" }
              : { height: "676px", width: "280px" }
          }
        >
          <div
            className={`${
              location.pathname === "/dashboard/home"
                ? "sidebar-item-active-open"
                : "sidebar-item-open"
            }`}
            onClick={handleHome}
          >
            <div className="sidebar-item-icon-open">
              <HomeIcon />
            </div>
            <div className="sidebar-item-text-open">Home</div>
          </div>

          <div
            className={isMyTeamsOpen ? "sidebar-myteams-active-open" : "sidebar-myteams-open"}
            onClick={handleMyTeams}
          >
            <div className="myteams-arrow-open">
              {!isMyTeamsOpen ? <ArrowRightIcon /> : <ArrowDropDownIcon />}
            </div>
            <div className="sidebar-myteams-icon-open">
              <GroupsIcon />
            </div>
            <div className="sidebar-myteams-text-open">My Teams</div>
          </div>
          {isMyTeamsOpen ? (
            <>
              {myTeamsData.map((item, index) => (
                <div className="teams-item">
                  <Avatar
                    sx={{
                      bgcolor: item.iconColor,
                      height: "30px",
                      width: "30px",
                    }}
                    className="teams-item-avatar"
                  >
                    {item.name[0]}
                  </Avatar>
                  <p
                    className={id === item._id ? "teams-item-text-active" : "teams-item-text"}
                    onClick={() => handleTeam(item._id)}
                  >
                    {item.name.length > 20 ? item.name.slice(0, 20) + "..." : item.name}
                  </p>
                </div>
              ))}
            </>
          ) : null}

          <div className="sidebar-item-open" onClick={handleExit}>
            <div className="sidebar-item-icon-open">
              <ExitToAppIcon />
            </div>
            <div className="sidebar-item-text-open">Exit Dashboard</div>
          </div>
        </div>
      ) : (
        <div
          className="dashboard-sidebar"
          style={myTeamsData.length > 6 ? { height: "100%" } : { height: "676px" }}
        >
          <Tooltip title="Dashboard Home">
            <div
              className={`${
                location.pathname === "/dashboard/home"
                  ? "sidebar-item-active-close"
                  : "sidebar-item-close"
              }`}
              onClick={handleHome}
            >
              <div className="sidebar-item-icon-close">
                <HomeIcon />
              </div>
            </div>
          </Tooltip>
          <Tooltip title="My Teams">
            <div className="sidebar-myteams-close">
              <div
                className={isMyTeamsOpen ? "sidebar-myteams-active-close" : "sidebar-myteams-close"}
                onClick={handleMyTeams}
              >
                <div className="myteams-arrow-close">
                  {!isMyTeamsOpen ? <ArrowRightIcon /> : <ArrowDropDownIcon />}
                </div>
                <div className="sidebar-myteams-icon-close">
                  <GroupsIcon />
                </div>
              </div>
            </div>
          </Tooltip>
          <Tooltip title="Exit Dashboard">
            <div className="sidebar-item-close" onClick={handleExit}>
              <div className="sidebar-item-icon-close">
                <ExitToAppIcon />
              </div>
            </div>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default DashboardSidebar;
