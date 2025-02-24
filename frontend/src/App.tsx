import React, { useState } from "react";
import "./App.css";
import Tasks from "./components/Tasks";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div className="centered-container">
      <nav className="nav">
        {token ? (
          <button className="btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <div className="nav-buttons">
            <button className="btn" onClick={() => setShowRegister(false)}>
              Login
            </button>
            <button className="btn" onClick={() => setShowRegister(true)}>
              Register
            </button>
          </div>
        )}
      </nav>
      <div className="content">
        {token ? (
          <Tasks token={token} />
        ) : showRegister ? (
          <Register onRegister={() => setShowRegister(false)} />
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>
    </div>
  );
}

export default App;
