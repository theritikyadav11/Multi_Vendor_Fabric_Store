import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchVendorOrders, deleteOrder } from "../../services/api";
import { toast } from "react-toastify";

const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchVendorOrders();
        setOrders(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setLoading(true);
      setError(null);
      try {
        await deleteOrder(orderId);
        toast.success("Order deleted successfully!");
        setOrders(orders.filter((order) => order._id !== orderId));
        setSelectedOrder(null);
      } catch (err) {
        setError(err.message || "Failed to delete order.");
        toast.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleView = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      {loading ? (
        <div>Loading orders...</div>
      ) : error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : orders.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-md shadow-sm p-4 flex flex-col md:flex-row items-start md:items-center justify-between"
            >
              <div>
                <p className="font-semibold">Order ID: {order._id}</p>
                {order.orderItems && order.orderItems.length > 0 && (
                  <p>Fabric: {order.orderItems[0].fabric_id.name}</p>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0">
                <button
                  onClick={() => handleView(order)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full sm:w-auto"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(order._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md w-full sm:w-auto"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detailed Order View */}
      {selectedOrder && (
        <div className="mt-8 bg-white rounded-md shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Order Details</h3>
          <p>Order ID: {selectedOrder._id}</p>
          <p>Customer Name: {selectedOrder.userId?.name}</p>
          <p>Customer Email: {selectedOrder.userId?.email}</p>
          <p>
            Order Date: {new Date(selectedOrder.orderDate).toLocaleDateString()}
          </p>
          <p>Total Amount: Rs. {selectedOrder.totalPrice}</p>
          <h4 className="font-semibold mt-4 mb-2">Ordered Items:</h4>
          <ul>
            {selectedOrder.items.map((item) => (
              <li key={item._id} className="mb-2">
                {item.fabric_id?.name} - Quantity: {item.quantity} - Price: Rs.{" "}
                {item.price}
              </li>
            ))}
          </ul>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
};

export default VendorOrders;
