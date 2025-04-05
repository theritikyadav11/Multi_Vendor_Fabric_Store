import React, { useContext } from "react";
import { Link } from "react-router-dom";
import heroImage from "../../assets/hero/hero-img.jpg";
import { useSelector } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";

const Home = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="container mx-auto p-6">
      {/* Welcome Section */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user ? user.name : "Vendor"}
        </h1>
        <p className="text-gray-600">
          Ready to manage your fabrics and orders?
        </p>
      </div>

      {/* Hero Section */}
      <div className="relative rounded-md overflow-hidden mb-8">
        <img
          src={heroImage}
          alt="Fabric Banner"
          className="w-full h-48 md:h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white text-center p-6">
          <h2 className="text-xl md:text-3xl font-bold">
            Showcase Your Unique Fabrics to a Wider Audience.
          </h2>
          {/* <p className="mt-2 text-lg">Manage your inventory and connect with customers.</p> */}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          to="/vendor/products"
          className="bg-white rounded-md shadow-md p-6 text-center hover:shadow-lg transition duration-300"
        >
          {/* Icon */}
          <svg
            className="w-8 h-8 mx-auto text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
          <h3 className="mt-2 font-semibold">View All Products</h3>
        </Link>

        <Link
          to="/vendor/add-product"
          className="bg-white rounded-md shadow-md p-6 text-center hover:shadow-lg transition duration-300"
        >
          {/* Icon */}
          <svg
            className="w-8 h-8 mx-auto text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m-6 0h6m6 0h6"
            ></path>
          </svg>
          <h3 className="mt-2 font-semibold">Add New Product</h3>
        </Link>

        <Link
          to="/vendor/orders"
          className="bg-white rounded-md shadow-md p-6 text-center hover:shadow-lg transition duration-300"
        >
          {/* Icon */}
          <svg
            className="w-8 h-8 mx-auto text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 11V7a4 4 0 00-8 0v4m-4 4h16m-6-4v4m-4-4v4"
            ></path>
          </svg>
          <h3 className="mt-2 font-semibold">View All Orders</h3>
        </Link>
      </div>
    </div>
  );
};

export default Home;
