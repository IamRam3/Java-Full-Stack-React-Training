import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const navigate = useNavigate();
  return (
    <div className="container mt-5 text-center">
      <h1>Welcome to Turf Management System</h1>
      <button className="btn btn-success mx-3 mt-4" onClick={() => navigate("/login")}>Login</button>
      <button className="btn btn-secondary mx-3 mt-4" onClick={() => navigate("/register")}>Register</button>
    </div>
  );
}
