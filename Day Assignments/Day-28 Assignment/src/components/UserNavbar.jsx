import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserNavbar() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/");
  }
  return (
    <nav className="navbar navbar-expand navbar-light bg-light mb-4">
      <div className="container">
        <a className="navbar-brand" href="#">Turf System</a>
        <button className="btn btn-outline-primary" onClick={() => navigate("/user")}>Browse Turfs</button>
        <button className="btn btn-outline-primary mx-2" onClick={() => navigate("/cart")}>Cart</button>
        <button className="btn btn-outline-primary mx-2" onClick={() => navigate("/checkout")}>Checkout</button>
        <button className="btn btn-danger float-end" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
