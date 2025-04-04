import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OrderConfirmation from "../components/OrderConfirmation";

const OrderConfirmationPage = () => {
  return (
    <div>
      <Navbar />
      <OrderConfirmation />
      <Footer />
    </div>
  );
};

export default OrderConfirmationPage;
