import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import EditTurf from './pages/EditTurf';

function RequireAuth({ children, role }) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={
          <RequireAuth role="admin">
            <AdminDashboard />
          </RequireAuth>
        } />
        <Route path="/user" element={
          <RequireAuth role="user">
            <UserDashboard />
          </RequireAuth>
        } />
        <Route path="/cart" element={
          <RequireAuth role="user">
            <Cart />
          </RequireAuth>
        } />
        <Route path="/checkout" element={
          <RequireAuth role="user">
            <Checkout />
          </RequireAuth>
        } />
        <Route path="/edit-turf/:id" element={
          <RequireAuth role="admin">
            <EditTurf />
          </RequireAuth>
        } />
      </Routes>
    </BrowserRouter>
  );
}
