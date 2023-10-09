import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Aboutus from "./pages/aboutus/Aboutus";
import MyTeams from "./pages/myTeams/MyTeams";
import CreateTeam from "./pages/createTeam/CreateTeam";
import JoinTeam from "./pages/joinTeam/JoinTeam";
import Profile from "./pages/profile/Profile";
import EmailVerification from "./pages/emailVerification/EmailVerification";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ForgotPasswordOtp from "./pages/forgotPassword/ForgotPasswordOtp";
import ChangePassword from "./pages/changePassword/ChangePassword";

const App = () => {
  return (
    <>
      <Router>
        <>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/auth/login" element={<Login />}></Route>
            <Route path="/auth/register" element={<Register />}></Route>
            <Route path="/aboutus" element={<Aboutus />}></Route>
            <Route path="/dashboard/home" element={<Dashboard />}></Route>
            <Route path="/CreateTeam" element={<CreateTeam />}></Route>
            <Route path="/JoinTeam" element={<JoinTeam />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/auth/verification/:id" element={<EmailVerification />}></Route>
            <Route path="/auth/forgotpassword" element={<ForgotPassword />}></Route>
            <Route path="/auth/forgotpassword/otp/:id" element={<ForgotPasswordOtp />}></Route>
            <Route path="/auth/changepassword/:id" element={<ChangePassword />}></Route>
          </Routes>
        </>
      </Router>
    </>
  );
};

export default App;
