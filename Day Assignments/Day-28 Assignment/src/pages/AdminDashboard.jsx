import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import TurfCard from "../components/TurfCard";
import { ApiService } from "../services/ApiService";

export default function AdminDashboard() {
  const [turfs, setTurfs] = useState([]);

  useEffect(() => {
    ApiService.getTurfs().then(res => setTurfs(res.data));
  }, []);

  function handleDelete(id) {
    ApiService.deleteTurf(id).then(() => {
      setTurfs(turfs.filter(t => t.id !== id));
    });
  }

  return (
    <>
      <AdminNavbar />
      <div className="container">
        <h3>Manage Turfs</h3>
        {turfs.map(turf => (
          <TurfCard key={turf.id} turf={turf} isAdmin onDelete={handleDelete} onEdit={() => {}} />
        ))}

      </div>
    </>
  );
}
