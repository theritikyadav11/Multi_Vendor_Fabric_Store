import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/userSlice";
import { toast } from "react-toastify";
import { fetchCart } from "../redux/cartSlice";
import {
  FaUser,
  FaShoppingCart,
  FaHeart,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const user = useSelector((state) => state.auth.user); // Assuming user role is in auth.user
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart data only if the user is logged in and is NOT a vendor
    if (user && user._id && user.role !== "vendor") {
      dispatch(fetchCart());
    }
  }, [dispatch, user]);

  useEffect(() => {
    // Calculate cart count whenever cartItems changes, but only if the user is not a vendor
    if (user && user.role !== "vendor") {
      setCartCount(
        cartItems && Array.isArray(cartItems)
          ? cartItems.reduce((total, item) => total + item.quantity, 0)
          : 0
      );
    } else {
      setCartCount(0); // Reset cart count for vendors
    }
  }, [cartItems, user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.info("Logged out successfully.");
    navigate("/");
    window.location.reload();
  };

  const handleUnauthorizedAccess = () => {
    toast.error("Please login to access this page.");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src="/image.png" alt="Logo" className="w-12" />
          <span className="text-2xl font-bold text-gray-800">Fabric-Store</span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8 text-lg">
          {user && user.role === "vendor" ? (
            <>
              <Link to="/vendor" className="text-gray-700 hover:text-gray-900">
                Home
              </Link>
              <Link
                to="/vendor/products"
                className="text-gray-700 hover:text-gray-900"
              >
                All Products
              </Link>
              <Link
                to="/vendor/add-product"
                className="text-gray-700 hover:text-gray-900"
              >
                Add Product
              </Link>
              <Link
                to="/vendor/orders"
                className="text-gray-700 hover:text-gray-900"
              >
                Orders
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="text-gray-700 hover:text-gray-900">
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-700 hover:text-gray-900"
              >
                Products
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-gray-900">
                About Us
              </Link>
            </>
          )}
        </div>

        {/* Icons Section */}
        <div className="flex items-center space-x-6 text-xl">
          {/* Favorite Icon with Toggle (Visible for Customers) */}
          {user && user.role !== "vendor" && (
            <FaHeart
              className={`cursor-pointer ${
                favorite ? "text-red-500" : "text-gray-700"
              }`}
              onClick={() => setFavorite(!favorite)}
            />
          )}

          {/* Cart Icon with Small Badge (Visible for Customers) */}
          {user && user.role !== "vendor" && (
            <Link
              to={user ? "/cart" : "#"}
              className="relative"
              onClick={!user ? handleUnauthorizedAccess : undefined}
            >
              <FaShoppingCart className="text-gray-700 text-2xl hover:text-gray-900 cursor-pointer" />
              <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs px-1.5 py-0.5 rounded-full text-center leading-none">
                {cartCount}
              </span>
            </Link>
          )}

          {/* User Icon with Login/Register/Logout (Visible in Desktop) */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to={user ? "/profile" : "#"}
              onClick={!user ? handleUnauthorizedAccess : undefined}
            >
              <FaUser className="text-gray-700 text-2xl hover:text-gray-900 cursor-pointer" />
            </Link>
            {user ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 text-sm text-white bg-red-600 rounded-md shadow-md hover:bg-red-700 transition"
              >
                Logout
              </button>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-3 py-1 text-sm text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded-md shadow-md hover:bg-blue-600 hover:text-white transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Hamburger Menu Button (For Mobile) */}
          <div className="md:hidden flex items-center space-x-4">
            <Link
              to={user ? "/profile" : "#"}
              onClick={!user ? handleUnauthorizedAccess : undefined}
            >
              <FaUser className="text-gray-700 text-2xl hover:text-gray-900 cursor-pointer" />
            </Link>
            <button
              className="text-gray-700 text-3xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white w-full flex flex-col items-center py-6 space-y-5 text-lg shadow-md">
          {user && user.role === "vendor" ? (
            <>
              <Link
                to="/vendor"
                className="text-gray-700 hover:text-gray-900"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/vendor/products"
                className="text-gray-700 hover:text-gray-900"
                onClick={() => setMenuOpen(false)}
              >
                All Products
              </Link>
              <Link
                to="/vendor/add-product"
                className="text-gray-700 hover:text-gray-900"
                onClick={() => setMenuOpen(false)}
              >
                Add Product
              </Link>
              <Link
                to="/vendor/orders"
                className="text-gray-700 hover:text-gray-900"
                onClick={() => setMenuOpen(false)}
              >
                Orders
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="text-gray-700 hover:text-gray-900"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-700 hover:text-gray-900"
                onClick={() => setMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-gray-900"
                onClick={() => setMenuOpen(false)}
              >
                About Us
              </Link>
            </>
          )}

          {/* Mobile Login/Logout Section */}
          <div className="flex flex-col items-center space-y-3 text-xl">
            {user ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-white bg-red-600 rounded-md shadow-md hover:bg-red-700 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md shadow-md hover:bg-blue-600 hover:text-white transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
