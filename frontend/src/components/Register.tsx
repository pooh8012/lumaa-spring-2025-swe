import React, { useState } from "react";
import { registerUser } from "../api";

interface Props {
  onRegister: () => void;
}

const Register: React.FC<Props> = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await registerUser(username, password);
    if (response.user) {
      setSuccess("Registration successful! You can now log in.");
      onRegister();
    } else {
      setError(response.message || "Registration failed");
    }
  };

  return (
    <div className="centered-container">
      <div className="futuristic-card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <label>Username:</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="btn">
            Register
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </div>
    </div>
  );
};

export default Register;
