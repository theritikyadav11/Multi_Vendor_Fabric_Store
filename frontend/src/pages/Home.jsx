import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import NewArrivals from "../components/NewArrivals";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <NewArrivals />
      <Footer />
    </>
  );
};

export default Home;
