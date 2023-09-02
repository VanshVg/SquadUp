import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Aboutus from "./pages/aboutus/Aboutus";

const App = () => {
  return (
    <>
      <Router>
        <>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/auth/login" element={<Login />}></Route>
            <Route path="/auth/register" element={<Register />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/aboutus" element={<Aboutus />}></Route>
          </Routes>
        </>
      </Router>
    </>
  );
};

export default App;
