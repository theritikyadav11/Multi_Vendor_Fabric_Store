import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createOrderAPI } from "../services/api";
import { clearCartDB } from "../redux/cartSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PaymentMethodSelector from "../components/PaymentMethod";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.auth.user);
  const [paymentMethod, setPaymentMethod] = useState("select_an_option");
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAddressChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method.");
      return;
    }
    if (Object.values(shippingAddress).some((value) => !value)) {
      toast.error("Please fill in all shipping address details.");
      return;
    }

    setIsProcessing(true);

    const orderItems = cartItems.map((item) => ({
      fabric_id: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    }));

    console.log("Cart Items in Checkout:", cartItems);
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    console.log(`Total price: ${totalPrice}`);

    const orderData = {
      userId: user._id,
      items: orderItems,
      totalPrice: totalPrice,
      paymentMethod: paymentMethod,
      shippingAddress: shippingAddress,
    };

    console.log("Frontend orderData being sent:", orderData);
    try {
      const response = await createOrderAPI(orderData);
      toast.success("Order placed successfully!");
      dispatch(clearCartDB());
      navigate(`/order-confirmation/${response.data._id}`); // Redirect with order ID
    } catch (error) {
      console.error("Checkout Error:", error);
      toast.error(
        error.response?.data?.message ||
          "There was an error processing your order."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-10">
        <h2 className="text-3xl font-semibold text-center mb-6">Checkout</h2>

        <div className="bg-white shadow-md rounded-md p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={shippingAddress.address}
                onChange={handleAddressChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="city"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={shippingAddress.city}
                onChange={handleAddressChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="state"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={shippingAddress.state}
                onChange={handleAddressChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="postalCode"
              >
                Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={shippingAddress.postalCode}
                onChange={handleAddressChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="country"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={shippingAddress.country}
                onChange={handleAddressChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-md p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
          <PaymentMethodSelector
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            disabled={isProcessing}
          />
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={
            isProcessing ||
            paymentMethod === "select_an_option" || // Add this condition
            Object.values(shippingAddress).some((value) => !value)
          }
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isProcessing ? "Placing Order..." : "Place Order"}
        </button>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
