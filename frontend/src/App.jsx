import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import ProfilePage from "./pages/ProfilePage";
import AboutUsPage from "./pages/AboutUsPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import CheckoutPage from "./pages/CheckoutPage";
import VendorHomePage from "./pages/VendorHomePage";
import VendorAllProducts from "./components/vendor/VendorAllProducts";
import AddProductPage from "./pages/vendor/AddProductPage";
import VendorOrdersPage from "./pages/vendor/VendorOrdersPage";
import VendorProductDetailsPage from "./pages/vendor/VendorProductDetailsPage";
import VendorAllProductsPage from "./pages/vendor/VendorAllProductsPage";
import EditProductPage from "./pages/vendor/EditProductPage";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route
          path="/order-confirmation/:orderId"
          element={<OrderConfirmationPage />}
        />
        {/* vendor Route */}
        <Route path="/vendor" element={<VendorHomePage />} />
        <Route path="/vendor/products" element={<VendorAllProductsPage />} />
        <Route path="/vendor/add-product" element={<AddProductPage />} />
        <Route path="/vendor/orders" element={<VendorOrdersPage />} />
        <Route
          path="/vendor/product/edit/:productId"
          element={<EditProductPage />}
        />
        <Route
          path="/vendor/fabric/:productId"
          element={<VendorProductDetailsPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
