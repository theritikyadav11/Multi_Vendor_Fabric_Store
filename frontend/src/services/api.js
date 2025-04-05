import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:8000" });
const API = axios.create({
  baseURL: "https://multi-vendor-fabric-store-backend.onrender.com",
});

// Attach token to each request if user is logged in
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user")); // Get user data from localStorage
  if (user && user.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

// Auth APIs
export const loginUser = (data) => API.post("/api/auth/login", data);
export const registerUser = (data) => API.post("/api/auth/register", data);

// Orders API
export const getOrders = () => API.get("/api/orders");

// Fabrics API
export const getAllFabrics = () => API.get("/api/fabrics");

// User API
export const updateUser = (userId, data) =>
  API.put("/api/users/profile/update", { userId, ...data }); // Route matches backend
export const deleteUser = (userId) =>
  API.delete("/api/users/profile/delete", { data: { userId } }); // Route matches backend, userId in body

// Cart APIs

// Fetch the current user's cart
export const getCart = async (userId) => {
  try {
    const response = await API.get(`/api/cart?userId=${userId}`);
    console.log("API getCart Response:", response.data); // Log the actual data
    return response.data; // Return just the data part
  } catch (error) {
    console.error("API getCart Error:", error.response?.data || error.message);
    throw error;
  }
};

// Add an item to the cart
export const addToCartAPI = (data) => API.post("/api/cart", data);

// Clear the entire cart
export const clearCartAPI = (userId) =>
  API.delete("/api/cart/clear", { data: { userId } });

// Remove a specific item from the cart
export const removeFromCartAPI = (productId, userId) =>
  API.delete(`/api/cart/${productId}`, { data: { userId } });

// Update item quantity in the cart
export const updateCartAPI = (userId, fabricId, quantity) =>
  API.put(`/api/cart/${fabricId}`, { userId, fabricId, quantity });

// Checkout API
export const createOrderAPI = (orderData) =>
  API.post("/api/checkout", orderData);

export const fetchOrderDetails = (orderId) => API.get(`/api/orders/${orderId}`);

//vendor API
export const fetchVendorProducts = (vendorId) =>
  API.get(`/api/fabrics/vendor/fabrics`);
export const fetchProductDetails = (productId) =>
  API.get(`/api/fabrics/vendor/fabrics/${productId}`);

export const updateProduct = (productId, productData) =>
  API.put(`/api/fabrics/${productId}`, productData);

export const deleteProduct = (productId) =>
  API.delete(`/api/fabrics/${productId}`);

export const addProduct = (productData) =>
  API.post("/api/fabrics", productData);

//vendor orders
export const fetchVendorOrders = () => API.get("/api/orders/vendor/orders");
export const deleteOrder = (orderId) =>
  API.delete(`/api/orders/vendor/orders/${orderId}`);
