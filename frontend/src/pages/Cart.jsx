import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCart,
  removeFromCartDB,
  updateQuantityDB,
  clearCartDB,
} from "../redux/cartSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems = [], loading, error } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth?.user);

  // Debug logs
  useEffect(() => {
    console.log("Current user:", user);
    console.log("Cart items:", cartItems);
  }, [user, cartItems]);

  useEffect(() => {
    console.log("Component mounted - current user:", user);
    if (user?._id) {
      console.log("Dispatching fetchCart for user ID:", user._id);
      dispatch(fetchCart())
        .unwrap()
        .then((response) => {
          console.log("Cart fetch successful - response:", response);
        })
        .catch((error) => {
          console.error("Cart fetch failed:", error);
        });
    }
  }, [dispatch, user?._id]);

  const handleProceedToCheckout = () => {
    if (!user) {
      toast.error("Please login to checkout.");
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCartDB(productId));
  };

  const handleQuantityChange = (fabricId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantityDB({ fabricId: fabricId, quantity: newQuantity }));
    } else if (newQuantity === 0) {
      handleRemove(fabricId);
    }
  };

  const handleClearCart = () => {
    dispatch(clearCartDB());
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const product = item.product || item;
        return total + (product.price || 0) * (item.quantity || 1);
      }, 0)
      .toFixed(2);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-10 ">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Shopping Cart
        </h2>

        {loading && (
          <div className="text-center py-10">
            <p className="text-gray-600">Loading your cart...</p>
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg mb-6">
            Error loading cart: {error.message || error.toString()}
          </div>
        )}

        {!loading && cartItems.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600 mb-4">Your cart is empty.</p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Cart Header (Desktop) */}
            <div className="hidden md:grid grid-cols-6 gap-4 items-center font-semibold py-3 border-b">
              <p>Product</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>

            {/* Cart Items */}
            {cartItems.map((item) => {
              const product = item.product || item;
              return (
                <div
                  key={item._id || product._id}
                  className="flex flex-col md:grid md:grid-cols-6 gap-4 items-center py-4 border-b"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/80";
                      }}
                    />
                  </div>

                  {/* Title */}
                  <p className="font-medium text-center md:text-left">
                    {product.name}
                  </p>

                  {/* Price */}
                  <p className="text-gray-700 text-center md:text-left">
                    Rs.{product.price?.toFixed(2)}
                  </p>

                  {/* Quantity Selector */}
                  <div className="flex items-center justify-center md:justify-start border rounded-lg w-max mx-auto">
                    <button
                      className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded-l"
                      onClick={() =>
                        handleQuantityChange(
                          item.product._id,
                          item.quantity - 1
                        )
                      }
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={item.quantity}
                      readOnly
                      className="w-10 text-center font-semibold bg-white border-none"
                    />
                    <button
                      className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded-r"
                      onClick={() =>
                        handleQuantityChange(
                          item.product._id,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  {/* Total Price */}
                  <p className="text-gray-700 hidden md:block">
                    Rs.{(product.price * item.quantity).toFixed(2)}
                  </p>

                  {/* Remove Button */}
                  <button
                    className="text-red-500 hover:text-red-700 text-lg mx-auto"
                    onClick={() => handleRemove(item.product._id)}
                  >
                    ✖
                  </button>

                  {/* Total (Mobile View) */}
                  <p className="text-gray-700 text-center md:hidden mt-2">
                    <strong>Total:</strong> Rs.
                    {(product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              );
            })}

            {/* Cart Summary */}
            <div className="mt-6 p-6 bg-gray-100 rounded-lg">
              <h3 className="text-2xl font-semibold">Cart Summary</h3>
              <div className="flex justify-between text-lg mt-3">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>Rs.{calculateTotal()}</span>
              </div>
              <div className="flex justify-between text-lg mt-1">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-xl font-bold mt-2 pt-2 border-t">
                <span>Total</span>
                <span>Rs.{calculateTotal()}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 mt-6">
              <button
                className="w-full md:w-1/2 bg-red-500 text-white py-3 text-lg font-semibold rounded-lg hover:bg-red-600 disabled:bg-red-300"
                onClick={handleProceedToCheckout}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>

              <button
                className="w-full md:w-1/2 bg-gray-700 text-white py-3 text-lg font-semibold rounded-lg hover:bg-gray-800 disabled:bg-gray-400"
                onClick={handleClearCart}
                disabled={cartItems.length === 0}
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
