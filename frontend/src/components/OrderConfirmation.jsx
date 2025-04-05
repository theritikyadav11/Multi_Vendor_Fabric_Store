import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchOrderDetails } from "../services/api";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchOrderDetails(orderId);
        setOrder(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, dispatch]);

  if (loading) {
    return <div className="text-center py-10">Loading order details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">Error: {error}</div>;
  }

  if (!order) {
    return <div className="text-center py-10">Order not found.</div>;
  }

  return (
    <>
      <div className="container mx-auto px-6 py-10">
        <div className="text-center mb-8">
          <CheckCircleIcon className="w-16 h-16 mx-auto text-green-500 mb-4" />
          <h2 className="text-3xl font-semibold text-green-600 mb-2">
            Order Confirmed!
          </h2>
          {user && (
            <p className="text-lg text-gray-700">
              Thank you for your order,{" "}
              {order.shippingAddress.name || user.name}!
            </p>
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg p-8 mb-6">
          <h3 className="text-xl font-semibold mb-6 border-b pb-2">
            Order Details
          </h3>
          <div className="mb-4">
            <strong className="text-gray-700">Order ID:</strong> {order._id}
          </div>
          <div className="mb-4">
            <strong className="text-gray-700">Date:</strong>{" "}
            {new Date(order.orderDate).toLocaleDateString()}
          </div>
          <div className="mb-6 border-b pb-4">
            <strong className="text-gray-700">Payment Method:</strong>{" "}
            {order.paymentMethod}
          </div>

          <div className="mb-6">
            <h4 className="font-semibold mb-3">Shipping Address:</h4>
            <p className="text-gray-700">{order.shippingAddress.address}</p>
            <p className="text-gray-700">
              {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
              {order.shippingAddress.postalCode}
            </p>
            <p className="text-gray-700">{order.shippingAddress.country}</p>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold mb-3">Items:</h4>
            {order.items.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {order.items.map((item) => (
                  <li
                    key={item.fabric_id}
                    className="py-4 flex items-center justify-between"
                  >
                    <div className="flex-grow">
                      <p className="font-semibold">
                        {item.product && item.product.name
                          ? item.product.name
                          : "Product information not available"}
                      </p>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="ml-4">
                      <span className="font-semibold text-gray-700">
                        Rs. {item.price}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No items in this order.</p>
            )}
          </div>

          <div className="mt-6 border-t pt-4">
            <p className="font-semibold text-lg text-gray-800">
              Total:{" "}
              <span className="text-green-600">
                Rs. {order.totalPrice.toFixed(2)}
              </span>
            </p>
          </div>
        </div>

        <p className="mb-4 text-gray-600">
          You will receive an email with your order details shortly.
        </p>

        <div className="text-center">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Go Back to Shopping
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmation;
