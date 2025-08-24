import React from "react";

export default function TurfCard({ turf, onAddToCart, isAdmin, onEdit, onDelete }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h4 className="card-title">{turf.title}</h4>
        <p>{turf.description}</p>
        <p><strong>Location:</strong> {turf.location}</p>
        <p><strong>Price:</strong> ₹{turf.price}</p>
        {!isAdmin ? (
          <button className="btn btn-primary" onClick={() => onAddToCart(turf)}>
            Add to Cart
          </button>
        ) : (
          <>
            <button className="btn btn-warning mx-2" onClick={() => onEdit(turf)}>Edit</button>
            <button className="btn btn-danger" onClick={() => onDelete(turf.id)}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
}
