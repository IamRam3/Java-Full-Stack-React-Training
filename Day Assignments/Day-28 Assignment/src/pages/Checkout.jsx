import React, { useEffect, useState } from "react";
import UserNavbar from "../components/UserNavbar";
import { ApiService } from "../services/ApiService";

export default function Checkout() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    ApiService.getCart().then(res => setCart(res.data));
  }, []);

  async function handleCheckout() {
    for (let item of cart) {
      await ApiService.checkout(item);
      await ApiService.removeFromCart(item.id);
    }
    alert("Booking Successful!");
    setCart([]);
  }

  return (
    <>
      <UserNavbar />
      <div className="container">
        <h3>Checkout</h3>
        {cart.length === 0 ? <p>No items to checkout.</p> :
          <button className="btn btn-success" onClick={handleCheckout}>Confirm Booking</button>
        }
      </div>
    </>
  );
}
