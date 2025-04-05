import React from "react";
import { Link } from "react-router-dom"; // Import Link
import heroImage from "../assets/aboutus/hero-image.jpeg";
import developer1 from "../assets/aboutus/developer1.jpg";
import developer2 from "../assets/aboutus/developer2.jpg";
import developer3 from "../assets/aboutus/developer3.jpg";
import developer4 from "../assets/aboutus/developer4.png";
import kshtiz from "../assets/aboutus/kshitiz.jpg";
import ourStory from "../assets/aboutus/our-story.jpg";

const AboutUs = () => {
  return (
    <div className="container mx-auto p-6">
      {/* Hero Section */}
      <section className="mb-8">
        <div className="relative rounded-md overflow-hidden">
          <img
            src={heroImage}
            alt="About Us Banner"
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white text-center p-6">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold mb-4">
                Crafting Stories with Fabric.
              </h1>
              <p className="text-lg md:text-xl">
                Your Destination for Unique and Quality Textiles.
              </p>
              <Link
                to="/products"
                className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md inline-block"
              >
                Explore Our Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Our Story</h2>
        <div className="md:flex gap-8">
          <div className="md:w-1/2">
            <p className="mb-4">
              It all started with a passion for the tactile beauty and endless
              possibilities of fabric...
            </p>
            <p className="mb-4">
              Driven by a desire to connect creators with exceptional materials,
              we embarked on a journey...
            </p>
            {/* Add more paragraphs about your story */}
          </div>
          {/* <div className="md:w-1/2">
            <img
              src={ourStory}
              alt="Our Story"
              className="rounded-md shadow-md"
            />
          </div> */}
        </div>
      </section>

      {/* Our Commitment Section */}
      <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">
          Our Commitment to You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-4">
            {/* Icon */}
            <svg
              className="w-6 h-6 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <p>
              <strong>Quality Fabrics You Can Trust</strong>
            </p>
          </div>
          {/* Add more commitment points with icons */}
          <div className="flex items-center gap-4">
            {/* Icon */}
            <svg
              className="w-6 h-6 text-green-500"
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
            <p>
              <strong>A Curated Selection for Every Project</strong>
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* Icon */}
            <svg
              className="w-6 h-6 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <p>
              <strong>Dedicated Customer Support</strong>
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* Icon */}
            <svg
              className="w-6 h-6 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 14v6m-3-3v6m-3-3v6m-9-9h18M9 14h6"
              ></path>
            </svg>
            <p>
              <strong>Building a Community of Fabric Lovers</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section (Optional) */}
      <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-4">
            <img
              src={developer1}
              alt="Team Member 1"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="font-semibold">Ritik Singh</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <img
              src={developer3}
              alt="Team Member 2"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="font-semibold">Hitesh kohli</h3>
              <p className="text-gray-600">Head of Design</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <img
              src={developer2}
              alt="Team Member 3"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="font-semibold">Prakash Singh</h3>
              <p className="text-gray-600">Frontend Developer</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <img
              src={developer4}
              alt="Team Member 3"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="font-semibold">Arvind Kumar</h3>
              <p className="text-gray-600">Backend Developer</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <img
              src={kshtiz}
              alt="Team Member 5"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="font-semibold">Kshitiz Sharma</h3>
              <p className="text-gray-600">Frontend Developer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Our Values</h2>
        <div className="flex flex-wrap gap-4">
          <div className="bg-gray-100 rounded-full py-2 px-4">
            Passion for Quality
          </div>
          <div className="bg-gray-100 rounded-full py-2 px-4">
            Commitment to Customers
          </div>
          <div className="bg-gray-100 rounded-full py-2 px-4">
            Celebrating Creativity
          </div>
          {/* Add more values */}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="text-center">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">
          Explore Our Exquisite Fabric Collection Today!
        </h2>
        <Link
          to="/products"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md inline-block"
        >
          Shop Now
        </Link>
      </section>
    </div>
  );
};

export default AboutUs;
