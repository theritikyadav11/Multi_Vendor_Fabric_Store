import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import VendorOrders from "../../components/vendor/VendorOrders";

const VendorOrdersPage = () => {
  return (
    <div>
      <Navbar />
      <VendorOrders />
      <Footer />
    </div>
  );
};

export default VendorOrdersPage;
