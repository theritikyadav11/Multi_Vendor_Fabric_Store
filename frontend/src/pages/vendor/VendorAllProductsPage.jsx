import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import VendorAllProducts from "../../components/vendor/VendorAllProducts";

const VendorAllProductsPage = () => {
  return (
    <div>
      <Navbar />
      <VendorAllProducts />
      <Footer />
    </div>
  );
};

export default VendorAllProductsPage;
