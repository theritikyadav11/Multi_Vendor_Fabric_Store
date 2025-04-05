import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import VendorProductDetails from "../../components/vendor/VendorProductDetails";

const VendorProductDetailsPage = () => {
  return (
    <div>
      <Navbar />
      <VendorProductDetails />
      <Footer />
    </div>
  );
};

export default VendorProductDetailsPage;
