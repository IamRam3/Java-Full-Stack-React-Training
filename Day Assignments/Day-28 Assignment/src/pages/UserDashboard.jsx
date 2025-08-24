import React, { useState, useEffect } from "react";
import UserNavbar from "../components/UserNavbar";
import TurfCard from "../components/TurfCard";
import { ApiService } from "../services/ApiService";

export default function UserDashboard() {
  const [turfs, setTurfs] = useState([]);

  useEffect(() => {
    ApiService.getTurfs().then(res => setTurfs(res.data));
  }, []);

  function handleAddToCart(turf) {
    ApiService.addToCart({ ...turf, quantity: 1 });
    alert("Added to cart!");
  }

  return (
    <>
      <UserNavbar />
      <div className="container">
        <h3>Browse Turfs</h3>
        {turfs.map(turf => (
          <TurfCard key={turf.id} turf={turf} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </>
  );
}
