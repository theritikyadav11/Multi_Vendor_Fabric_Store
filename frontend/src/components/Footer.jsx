import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaCcVisa, FaCcPaypal, FaCcMastercard } from "react-icons/fa6";
import free_deliveryIcon from "../assets/footer/free_delivery.png";
import returnIcon from "../assets/footer/return.png";
import supportIcon from "../assets/footer/support.png";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-6">
      {/* Top Section */}
      <div className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 text-center gap-6 border-b border-gray-300">
        <div>
          <img
            src={free_deliveryIcon}
            alt="Free Delivery"
            className="mx-auto w-12 mb-2"
          />
          <h3 className="text-lg font-semibold">Free Delivery</h3>
          <p className="text-sm">For orders above $100.</p>
        </div>
        <div>
          <img
            src={returnIcon}
            alt="90 Days Return"
            className="mx-auto w-12 mb-2"
          />
          <h3 className="text-lg font-semibold">90 Days Return</h3>
          <p className="text-sm">If goods have problems.</p>
        </div>
        <div>
          <img
            src={supportIcon}
            alt="24/7 Support"
            className="mx-auto w-12 mb-2"
          />
          <h3 className="text-lg font-semibold">24/7 Support</h3>
          <p className="text-sm">Dedicated support.</p>
        </div>
      </div>

      {/* Middle Section */}
      <div className="container mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-gray-500">
                New Products
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-500">
                Top Sellers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-500">
                Our Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-500">
                About Our Shop
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-500">
                Secure Shopping
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-gray-500">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-500">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-500">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-500">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Information */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Information</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-gray-500">
                Shipping Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-500">
                Returns & Exchanges
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-500">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-500">
                Customer Support
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
          <p className="text-sm mb-2">
            Sign up to receive updates on new products and discounts.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your Email Address"
              className="w-full p-2 border border-gray-300 rounded-l-md"
            />
            <button className="bg-orange-500 text-white px-4 rounded-r-md">
              Subscribe
            </button>
          </div>
          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-300 py-4 px-6 flex flex-col md:flex-row justify-center items-center ">
        <h3>© 2025 Fabric-Store. All rights reserved.</h3>
        {/* Payment Icons */}
        {/* <div className="flex space-x-4">
          <FaCcVisa size={40} className="text-gray-600" />
          <FaCcPaypal size={40} className="text-gray-600" />
          <FaCcMastercard size={40} className="text-gray-600" />
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
