import { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("customer");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ name, email, password, phone, address, role });
      toast.success("Registration successful! Please login.", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/");
    } catch (error) {
      toast.error("Error registering user. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          className="p-8 bg-white shadow-lg rounded-lg w-96"
          onSubmit={handleRegister}
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

          <input
            type="text"
            placeholder="Name"
            className="border p-2 w-full mb-4 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full mb-4 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 w-full mb-4 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="border p-2 w-full mb-4 rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <textarea
            placeholder="Address"
            className="border p-2 w-full mb-4 rounded"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <select
            className="border p-2 w-full mb-4 rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="customer">Customer</option>
            <option value="vendor">Vendor</option>
          </select>

          <button
            type="submit"
            className="bg-green-600 text-white p-2 rounded w-full hover:bg-green-700"
          >
            Register
          </button>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 underline">
              Login
            </a>
          </p>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Register;
