import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./features/authSlice";
import WelcomeMessage from "./components/WelcomeMessage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.auth);
  const [darkmode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkModeloginapp") === "true";
  });

  useEffect(() => {
    document.body.className = darkmode ? "dark" : "";
    localStorage.setItem("darkModeloginapp", darkmode);
  });

  return (
    <>
      <Router>
        <div className="app-container">
          <button onClick={() => setDarkMode(!darkmode)}>
            {darkmode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
          <Routes>
            <Route
              path="/"
              element={
                loggedIn ? (
                  <>
                    <div className="message-box">
                      🎉 Congratulations, you have logged in!
                    </div>
                    <WelcomeMessage />
                    <button onClick={() => dispatch(logout())}>
                      🔓 Logout
                    </button>
                    <Navigate to="/dashboard" />
                  </>
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/dashboard"
              element={loggedIn ? <Dashboard /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
