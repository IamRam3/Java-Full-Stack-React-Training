import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const ApiService = {
  login: (email, password) =>
    axios.get(`${API_URL}/users?email=${email}&password=${password}`),

  register: (user) => axios.post(`${API_URL}/users`, user),

  getTurfs: () => axios.get(`${API_URL}/turfs`),
  addTurf: (turf) => axios.post(`${API_URL}/turfs`, turf),
  updateTurf: (id, turf) => axios.put(`${API_URL}/turfs/${id}`, turf),
  deleteTurf: (id) => axios.delete(`${API_URL}/turfs/${id}`),

  getCart: () => axios.get(`${API_URL}/cart`),
  addToCart: (item) => axios.post(`${API_URL}/cart`, item),
  removeFromCart: (id) => axios.delete(`${API_URL}/cart/${id}`),

  checkout: (booking) => axios.post(`${API_URL}/bookings`, booking),
  getBookings: () => axios.get(`${API_URL}/bookings`),
};
