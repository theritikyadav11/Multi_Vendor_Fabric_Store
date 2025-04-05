import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { loginSuccess } from "../redux/authSlice";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ email, password });
      dispatch(loginSuccess(data));
      toast.success("Login successful!");
      if (data.role === "vendor") {
        navigate("/vendor");
      } else {
        navigate("/"); // Redirect to customer homepage
      }
      window.location.reload();
    } catch (error) {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          className="p-8 bg-white shadow-lg rounded-lg w-96"
          onSubmit={handleLogin}
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
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
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700"
          >
            Login
          </button>
          <p className="text-center mt-4">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500 underline">
              Register
            </a>
          </p>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;
