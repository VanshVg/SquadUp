import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <Router>
        <>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/auth/login" element={<Login />}></Route>
            <Route path="/auth/register" element={<Register />}></Route>
          </Routes>
        </>
      </Router>
    </>
  );
};

export default App;
