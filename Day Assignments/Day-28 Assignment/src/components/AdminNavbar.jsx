import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/");
  }
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
      <div className="container">
        <a className="navbar-brand" href="#">Admin Dashboard</a>
        <button className="btn btn-outline-light" onClick={() => navigate("/admin")}>Home</button>
        <button className="btn btn-outline-light mx-2" onClick={() => navigate("/admin")}>Manage Turfs</button>
        <button className="btn btn-outline-light mx-2" onClick={() => navigate("/admin")}>View Bookings</button>
        <button className="btn btn-danger float-end" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
