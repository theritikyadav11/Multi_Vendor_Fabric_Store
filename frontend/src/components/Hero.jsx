import React from "react";
import { Link } from "react-router-dom";
import heroImg from "../assets/hero/hero-img.jpg";

const Hero = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16 ">
      {/* Left Content */}
      <div className="md:w-1/2 text-center md:text-left space-y-6">
        <span className="bg-yellow-200 text-black px-4 py-1 rounded-full text-sm font-semibold">
          50% OFF Summer Super Sale
        </span>
        <h1 className="text-4xl font-bold text-gray-900 leading-tight">
          Step into Style: Your Ultimate Fashion Destination
        </h1>
        <p className="text-gray-600 text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore.
        </p>
        <Link
          to="/products"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md inline-block"
        >
          Shop Now
        </Link>
      </div>

      {/* Right Image Section - Full Width */}
      <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
        <img
          src={heroImg}
          alt="Fashion Model"
          className="w-full md:w-full object-cover"
        />
      </div>
    </section>
  );
};

export default Hero;
