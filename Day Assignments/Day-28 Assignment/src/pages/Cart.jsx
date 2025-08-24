import React, { useState, useEffect } from "react";
import UserNavbar from "../components/UserNavbar";
import { ApiService } from "../services/ApiService";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    ApiService.getCart().then(res => setCart(res.data));
  }, []);

  function handleRemove(id) {
    ApiService.removeFromCart(id).then(() => {
      setCart(cart.filter(x => x.id !== id));
    });
  }

  function handleUpdate(id, qty) {
    const item = cart.find(x => x.id === id);
    ApiService.updateTurf(id, { ...item, quantity: qty }).then(() => {
      setCart(cart.map(x => x.id === id ? { ...x, quantity: qty } : x));
    });
  }

  return (
    <>
      <UserNavbar />
      <div className="container">
        <h3>Your Cart</h3>
        {cart.length === 0 && <p>No items in cart.</p>}
        {cart.map(item => (
          <div className="card mb-2" key={item.id}>
            <div className="card-body">
              <h5>{item.title}</h5>
              <p>Quantity: 
                <input type="number" min={1} value={item.quantity} 
                  onChange={e => handleUpdate(item.id, Number(e.target.value))} className="mx-2" />
              </p>
              <button className="btn btn-danger" onClick={() => handleRemove(item.id)}>Remove</button>
            </div>
          </div>
        ))}
        <button className="btn btn-success mt-3" onClick={() => window.location.href="/checkout"} disabled={cart.length===0}>Checkout</button>
      </div>
    </>
  );
}
